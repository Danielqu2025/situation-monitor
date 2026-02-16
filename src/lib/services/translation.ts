/**
 * Translation service - supports local LLM (Ollama) and cloud APIs
 * Budget-friendly: prioritizes local models to avoid API costs
 */

import { browser } from '$app/environment';

export type TranslationProvider = 'ollama' | 'libretranslate' | 'none';

export interface TranslationConfig {
	provider: TranslationProvider;
	ollamaUrl: string;
	ollamaModel: string;
	enabled: boolean;
	targetLanguage: string;
}

export interface TranslationCache {
	[originalText: string]: {
		translated: string;
		timestamp: number;
		targetLang: string;
	};
}

// Default configuration
export const DEFAULT_CONFIG: TranslationConfig = {
	provider: 'ollama',
	ollamaUrl: 'http://localhost:11434',
	ollamaModel: 'qwen2.5:3b',
	enabled: false,
	targetLanguage: 'zh'
};

// Storage keys
const CONFIG_KEY = 'situationMonitor_translationConfig';
const CACHE_KEY = 'situationMonitor_translationCache';
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

// In-memory cache
let translationCache: TranslationCache = {};

/**
 * Load translation configuration from localStorage
 */
export function loadTranslationConfig(): TranslationConfig {
	if (!browser) return DEFAULT_CONFIG;

	try {
		const stored = localStorage.getItem(CONFIG_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			return { ...DEFAULT_CONFIG, ...parsed };
		}
	} catch (e) {
		console.warn('Failed to load translation config:', e);
	}
	return DEFAULT_CONFIG;
}

/**
 * Save translation configuration to localStorage
 */
export function saveTranslationConfig(config: Partial<TranslationConfig>): void {
	if (!browser) return;

	try {
		const current = loadTranslationConfig();
		const updated = { ...current, ...config };
		localStorage.setItem(CONFIG_KEY, JSON.stringify(updated));
	} catch (e) {
		console.warn('Failed to save translation config:', e);
	}
}

/**
 * Load translation cache from localStorage
 */
export function loadTranslationCache(): TranslationCache {
	if (!browser) return {};

	try {
		const stored = localStorage.getItem(CACHE_KEY);
		if (stored) {
			const parsed: TranslationCache = JSON.parse(stored);
			// Filter out expired entries
			const now = Date.now();
			const valid: TranslationCache = {};
			for (const [key, value] of Object.entries(parsed)) {
				if (now - value.timestamp < CACHE_TTL) {
					valid[key] = value;
				}
			}
			translationCache = valid;
			return valid;
		}
	} catch (e) {
		console.warn('Failed to load translation cache:', e);
	}
	return {};
}

/**
 * Save translation cache to localStorage
 */
export function saveTranslationCache(): void {
	if (!browser) return;

	try {
		// Limit cache size to prevent localStorage overflow
		const entries = Object.entries(translationCache);
		if (entries.length > 1000) {
			// Keep only the 500 most recent entries
			const sorted = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
			translationCache = Object.fromEntries(sorted.slice(0, 500));
		}
		localStorage.setItem(CACHE_KEY, JSON.stringify(translationCache));
	} catch (e) {
		console.warn('Failed to save translation cache:', e);
	}
}

/**
 * Get cached translation if available
 */
export function getCachedTranslation(text: string, targetLang: string): string | null {
	const cacheKey = `${text}::${targetLang}`;
	const cached = translationCache[cacheKey];

	if (cached && cached.targetLang === targetLang) {
		const now = Date.now();
		if (now - cached.timestamp < CACHE_TTL) {
			return cached.translated;
		}
	}
	return null;
}

/**
 * Store translation in cache
 */
export function cacheTranslation(original: string, translated: string, targetLang: string): void {
	const cacheKey = `${original}::${targetLang}`;
	translationCache[cacheKey] = {
		translated,
		timestamp: Date.now(),
		targetLang
	};
	saveTranslationCache();
}

/**
 * Check if Ollama is available
 */
export async function checkOllamaStatus(
	url: string = DEFAULT_CONFIG.ollamaUrl
): Promise<{ available: boolean; models?: string[]; error?: string }> {
	try {
		const response = await fetch(`${url}/api/tags`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});

		if (!response.ok) {
			return { available: false, error: `HTTP ${response.status}` };
		}

		const data = await response.json();
		const models = data.models?.map((m: { name: string }) => m.name) || [];
		return { available: true, models };
	} catch (e) {
		return { available: false, error: e instanceof Error ? e.message : 'Unknown error' };
	}
}

/**
 * Translate text using Ollama (local LLM)
 */
export async function translateWithOllama(
	text: string,
	targetLang: string = 'zh',
	model: string = DEFAULT_CONFIG.ollamaModel,
	url: string = DEFAULT_CONFIG.ollamaUrl
): Promise<string> {
	const langName = targetLang === 'zh' ? '中文' : targetLang === 'en' ? 'English' : targetLang;

	const prompt = `Translate the following news headline to ${langName}. Only return the translation, no explanation:

${text}`;

	const response = await fetch(`${url}/api/generate`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			model,
			prompt,
			stream: false,
			options: {
				temperature: 0.3, // Lower temperature for more consistent translations
				num_predict: 200 // Limit response length
			}
		})
	});

	if (!response.ok) {
		throw new Error(`Ollama error: HTTP ${response.status}`);
	}

	const data = await response.json();
	return data.response?.trim() || text;
}

/**
 * Translate text using LibreTranslate (self-hosted or public instance)
 */
export async function translateWithLibreTranslate(
	text: string,
	sourceLang: string = 'en',
	targetLang: string = 'zh',
	apiUrl: string = 'https://libretranslate.de'
): Promise<string> {
	const response = await fetch(`${apiUrl}/translate`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			q: text,
			source: sourceLang,
			target: targetLang,
			format: 'text'
		})
	});

	if (!response.ok) {
		throw new Error(`LibreTranslate error: HTTP ${response.status}`);
	}

	const data = await response.json();
	return data.translatedText || text;
}

/**
 * Main translate function - auto-detects provider and handles caching
 */
export async function translate(
	text: string,
	options?: Partial<TranslationConfig>
): Promise<string> {
	if (!text || text.trim().length === 0) return text;

	const config = { ...loadTranslationConfig(), ...options };

	// Check cache first
	const cached = getCachedTranslation(text, config.targetLanguage);
	if (cached) return cached;

	// If translation disabled, return original
	if (!config.enabled) return text;

	// If target language is same as source (English), skip translation
	if (config.targetLanguage === 'en') return text;

	let translated = text;

	try {
		switch (config.provider) {
			case 'ollama':
				translated = await translateWithOllama(
					text,
					config.targetLanguage,
					config.ollamaModel,
					config.ollamaUrl
				);
				break;

			case 'libretranslate':
				translated = await translateWithLibreTranslate(text, 'en', config.targetLanguage);
				break;

			default:
				return text;
		}

		// Cache the result
		cacheTranslation(text, translated, config.targetLanguage);
	} catch (e) {
		console.warn('Translation failed:', e);
		// Return original on error
		return text;
	}

	return translated;
}

/**
 * Batch translate multiple texts (more efficient)
 */
export async function translateBatch(
	texts: string[],
	options?: Partial<TranslationConfig>
): Promise<string[]> {
	const config = { ...loadTranslationConfig(), ...options };

	if (!config.enabled || config.targetLanguage === 'en') {
		return texts;
	}

	// Process in parallel with rate limiting
	const results: string[] = [];
	const batchSize = 3; // Process 3 at a time to avoid overwhelming local LLM

	for (let i = 0; i < texts.length; i += batchSize) {
		const batch = texts.slice(i, i + batchSize);
		const batchResults = await Promise.all(batch.map((text) => translate(text, config)));
		results.push(...batchResults);

		// Small delay between batches
		if (i + batchSize < texts.length) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
	}

	return results;
}

// Initialize cache on module load
if (browser) {
	loadTranslationCache();
}
