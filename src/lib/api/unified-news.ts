/**
 * Unified News API - Fetches news based on language preference
 * - English: Uses GDELT API
 * - Chinese: Uses RSS feeds
 */

import type { NewsItem, NewsCategory } from '$lib/types';
import { get } from 'svelte/store';
import { language } from '$lib/stores/language';
import { feedSources } from '$lib/stores/feedSources';
import { fetchCategoryNews as fetchGDELTNews, fetchAllNews as fetchAllGDELTNews } from './news';
import { fetchRSSNewsForCategory, fetchAllRSSNews } from './rss';
import { logger } from '$lib/config/api';

export type Language = 'en' | 'zh';

/**
 * Get current language from store
 */
function getCurrentLanguage(): Language {
	return get(language) || 'en';
}

/**
 * Fetch news for a specific category based on language
 */
export async function fetchCategoryNews(
	category: NewsCategory,
	lang?: Language
): Promise<NewsItem[]> {
	const currentLang = lang || getCurrentLanguage();

	logger.log('News API', `Fetching ${category} news in ${currentLang}`);

	if (currentLang === 'zh') {
		// For Chinese, use RSS feeds
		const sources = get(feedSources).sources[category];
		return fetchRSSNewsForCategory(category, sources);
	} else {
		// For English, use GDELT
		return fetchGDELTNews(category);
	}
}

/**
 * Fetch all news based on language
 */
export async function fetchAllNews(lang?: Language): Promise<Record<NewsCategory, NewsItem[]>> {
	const currentLang = lang || getCurrentLanguage();

	logger.log('News API', `Fetching all news in ${currentLang}`);

	if (currentLang === 'zh') {
		// For Chinese, use RSS feeds
		const allSources = get(feedSources).sources;
		return fetchAllRSSNews(allSources);
	} else {
		// For English, use GDELT
		return fetchAllGDELTNews();
	}
}

/**
 * Fetch news with automatic language detection
 * This is the main entry point for news fetching
 */
export async function fetchNews(
	options: {
		category?: NewsCategory;
		lang?: Language;
	} = {}
): Promise<NewsItem[] | Record<NewsCategory, NewsItem[]>> {
	const { category, lang } = options;

	if (category) {
		return fetchCategoryNews(category, lang);
	}

	return fetchAllNews(lang);
}

// Re-export individual APIs for advanced usage
export { fetchCategoryNews as fetchGDELTNews, fetchAllNews as fetchAllGDELTNews } from './news';
export { fetchRSSNewsForCategory, fetchAllRSSNews } from './rss';
