/**
 * Feed sources store - manages user's custom feed sources with language support
 */

import { writable, get, derived } from 'svelte/store';
import { browser } from '$app/environment';
import {
	EN_RECOMMENDED_FEEDS,
	ZH_RECOMMENDED_FEEDS,
	getDefaultFeeds,
	type FeedSource,
	type Language
} from '$lib/config/feeds';
import { language } from './language';
import type { NewsCategory } from '$lib/types';

const STORAGE_KEY = 'situationMonitorFeedSources';

export interface FeedSourceState {
	sources: Record<NewsCategory, FeedSource[]>;
	isCustomized: boolean;
	language: Language;
}

/**
 * Load feed sources from localStorage or return defaults
 */
function loadFeedSources(lang: Language = 'en'): FeedSourceState {
	const defaultFeeds = getDefaultFeeds(lang);

	if (!browser) {
		return { sources: defaultFeeds, isCustomized: false, language: lang };
	}

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			// If language changed, use default feeds for new language
			if (parsed.language && parsed.language !== lang && !parsed.isCustomized) {
				return { sources: defaultFeeds, isCustomized: false, language: lang };
			}
			// Merge with defaults to ensure all categories exist
			const mergedSources = { ...defaultFeeds };
			if (parsed.sources) {
				(Object.keys(parsed.sources) as NewsCategory[]).forEach((category) => {
					if (parsed.sources[category]) {
						mergedSources[category] = parsed.sources[category];
					}
				});
			}
			return {
				sources: mergedSources,
				isCustomized: parsed.isCustomized ?? true,
				language: lang
			};
		}
	} catch (e) {
		console.warn('Failed to load feed sources from localStorage:', e);
	}

	return { sources: defaultFeeds, isCustomized: false, language: lang };
}

/**
 * Save feed sources to localStorage
 */
function saveFeedSources(state: FeedSourceState): void {
	if (!browser) return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch (e) {
		console.warn('Failed to save feed sources to localStorage:', e);
	}
}

/**
 * Get recommended feeds for a language
 */
function getRecommendedFeedsForLang(lang: Language): Record<NewsCategory, FeedSource[]> {
	return lang === 'zh' ? ZH_RECOMMENDED_FEEDS : EN_RECOMMENDED_FEEDS;
}

/**
 * Create the feed sources store
 */
function createFeedSourcesStore() {
	// Initialize with current language
	const initialLang = get(language) || 'en';
	const initialState = loadFeedSources(initialLang);
	const { subscribe, set, update } = writable<FeedSourceState>(initialState);

	// Subscribe to language changes
	if (browser) {
		language.subscribe((lang) => {
			update((state) => {
				// If not customized, switch to language-appropriate defaults
				if (!state.isCustomized) {
					const newSources = getDefaultFeeds(lang);
					const newState = { ...state, sources: newSources, language: lang };
					saveFeedSources(newState);
					return newState;
				}
				// If customized, just update the language marker
				return { ...state, language: lang };
			});
		});
	}

	return {
		subscribe,

		/**
		 * Add a feed source to a category
		 */
		addSource(category: NewsCategory, source: FeedSource) {
			update((state) => {
				// Check for duplicates
				const exists = state.sources[category].some(
					(s: FeedSource) => s.url === source.url || s.name === source.name
				);
				if (exists) {
					console.warn(`Feed source "${source.name}" already exists in ${category}`);
					return state;
				}

				const newState: FeedSourceState = {
					...state,
					sources: {
						...state.sources,
						[category]: [...state.sources[category], source]
					},
					isCustomized: true
				};
				saveFeedSources(newState);
				return newState;
			});
		},

		/**
		 * Remove a feed source from a category
		 */
		removeSource(category: NewsCategory, sourceUrl: string) {
			update((state) => {
				const newState: FeedSourceState = {
					...state,
					sources: {
						...state.sources,
						[category]: state.sources[category].filter((s: FeedSource) => s.url !== sourceUrl)
					},
					isCustomized: true
				};
				saveFeedSources(newState);
				return newState;
			});
		},

		/**
		 * Add a recommended source to a category
		 */
		addRecommendedSource(category: NewsCategory, sourceName: string, lang?: Language) {
			const currentLang = lang || get(language) || 'en';
			const recommendedFeeds = getRecommendedFeedsForLang(currentLang);
			const recommended = recommendedFeeds[category].find((s: FeedSource) => s.name === sourceName);
			if (recommended) {
				this.addSource(category, recommended);
			}
		},

		/**
		 * Get available recommended sources (not yet added) for a language
		 */
		getAvailableRecommended(category: NewsCategory, lang?: Language): FeedSource[] {
			const currentLang = lang || get(language) || 'en';
			const state = get({ subscribe });
			const recommendedFeeds = getRecommendedFeedsForLang(currentLang);
			const currentUrls = new Set(state.sources[category].map((s: FeedSource) => s.url));
			return recommendedFeeds[category].filter((s: FeedSource) => !currentUrls.has(s.url));
		},

		/**
		 * Get all recommended feeds for a language
		 */
		getRecommendedFeeds(lang?: Language): Record<NewsCategory, FeedSource[]> {
			const currentLang = lang || get(language) || 'en';
			return getRecommendedFeedsForLang(currentLang);
		},

		/**
		 * Reset a category to default sources for a language
		 */
		resetCategory(category: NewsCategory, lang?: Language) {
			const currentLang = lang || get(language) || 'en';
			const defaultFeeds = getDefaultFeeds(currentLang);
			update((state) => {
				const newState: FeedSourceState = {
					...state,
					sources: {
						...state.sources,
						[category]: [...defaultFeeds[category]]
					},
					isCustomized: true
				};
				saveFeedSources(newState);
				return newState;
			});
		},

		/**
		 * Reset all sources to defaults for a language
		 */
		resetAll(lang?: Language) {
			const currentLang = lang || get(language) || 'en';
			const defaultFeeds = getDefaultFeeds(currentLang);
			const newState: FeedSourceState = {
				sources: { ...defaultFeeds },
				isCustomized: false,
				language: currentLang
			};
			saveFeedSources(newState);
			set(newState);
		},

		/**
		 * Switch to language-specific feeds (if not customized)
		 */
		switchLanguage(lang: Language) {
			update((state) => {
				if (!state.isCustomized) {
					const newSources = getDefaultFeeds(lang);
					const newState = { ...state, sources: newSources, language: lang };
					saveFeedSources(newState);
					return newState;
				}
				return { ...state, language: lang };
			});
		},

		/**
		 * Get sources for a specific category
		 */
		getSources(category: NewsCategory): FeedSource[] {
			const state = get({ subscribe });
			return state.sources[category] || [];
		},

		/**
		 * Check if using default sources
		 */
		isUsingDefaults(): boolean {
			const state = get({ subscribe });
			return !state.isCustomized;
		},

		/**
		 * Get current language
		 */
		getLanguage(): Language {
			const state = get({ subscribe });
			return state.language;
		}
	};
}

// Export singleton store
export const feedSources = createFeedSourcesStore();

// Derived store for current language recommended feeds
export const recommendedFeeds = derived([feedSources, language], ([_, $language]) => {
	return getRecommendedFeedsForLang($language);
});
