/**
 * RSS Feed API - Fetch news from RSS feeds (primarily for Chinese sources)
 */

import type { NewsItem, NewsCategory } from '$lib/types';
import { fetchWithProxy, logger } from '$lib/config/api';
import { getDefaultFeeds, type FeedSource } from '$lib/config/feeds';
import { detectRegion, detectTopics, containsAlertKeyword } from '$lib/config/keywords';

/**
 * Parse RSS XML to extract items
 */
function parseRSS(xmlText: string, sourceName: string, category: NewsCategory): NewsItem[] {
	const items: NewsItem[] = [];

	// Simple regex-based RSS parsing (more reliable than DOMParser for various formats)
	const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
	const items_match = xmlText.matchAll(itemRegex);

	let index = 0;
	for (const itemMatch of items_match) {
		const itemXml = itemMatch[1];

		// Extract title
		const titleMatch = itemXml.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
		const title = titleMatch ? decodeHTMLEntities(titleMatch[1].trim()) : '';

		// Extract link
		const linkMatch = itemXml.match(/<link[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
		const link = linkMatch ? linkMatch[1].trim() : '';

		// Extract description
		const descMatch = itemXml.match(
			/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i
		);
		const description = descMatch ? decodeHTMLEntities(descMatch[1].trim()) : '';

		// Extract pubDate
		const dateMatch =
			itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) ||
			itemMatch[0].match(/<dc:date[^>]*>([\s\S]*?)<\/dc:date>/i);
		const pubDate = dateMatch ? dateMatch[1].trim() : '';

		if (title && link) {
			const timestamp = parseDate(pubDate);
			const text = `${title} ${description}`;
			const alertResult = containsAlertKeyword(text);

			items.push({
				id: `rss-${category}-${sourceName}-${index}-${timestamp}`,
				title,
				link,
				description: description || undefined,
				pubDate,
				timestamp,
				source: sourceName,
				category,
				isAlert: alertResult.isAlert,
				alertKeyword: alertResult.keyword,
				region: detectRegion(text) ?? undefined,
				topics: detectTopics(text)
			});
			index++;
		}
	}

	return items.slice(0, 10); // Limit to 10 items per feed
}

/**
 * Decode HTML entities
 */
function decodeHTMLEntities(text: string): string {
	const entities: Record<string, string> = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#39;': "'",
		'&nbsp;': ' ',
		'&hellip;': '...',
		'&mdash;': '—',
		'&ndash;': '–'
	};

	return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => entities[entity] || entity);
}

/**
 * Parse various date formats
 */
function parseDate(dateStr: string): number {
	if (!dateStr) return Date.now();

	const date = new Date(dateStr);
	if (!isNaN(date.getTime())) {
		return date.getTime();
	}

	// Try common Chinese date formats
	const chineseMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
	if (chineseMatch) {
		return new Date(`${chineseMatch[1]}-${chineseMatch[2]}-${chineseMatch[3]}`).getTime();
	}

	return Date.now();
}

/**
 * Fetch news from a single RSS feed
 */
async function fetchRSSFeed(feed: FeedSource, category: NewsCategory): Promise<NewsItem[]> {
	try {
		logger.log('RSS API', `Fetching ${feed.name} from ${feed.url}`);

		const response = await fetchWithProxy(feed.url);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const xmlText = await response.text();

		if (!xmlText.includes('<rss') && !xmlText.includes('<feed') && !xmlText.includes('<channel')) {
			logger.warn('RSS API', `Invalid RSS format from ${feed.name}`);
			return [];
		}

		return parseRSS(xmlText, feed.name, category);
	} catch (error) {
		logger.error('RSS API', `Error fetching ${feed.name}:`, error);
		return [];
	}
}

/**
 * Fetch news from RSS feeds for a specific category
 */
export async function fetchRSSNewsForCategory(
	category: NewsCategory,
	feeds?: FeedSource[]
): Promise<NewsItem[]> {
	// Use provided feeds or get default Chinese feeds
	const categoryFeeds = feeds || getDefaultFeeds('zh')[category] || [];

	if (categoryFeeds.length === 0) {
		logger.warn('RSS API', `No feeds configured for ${category}`);
		return [];
	}

	// Fetch from all feeds concurrently
	const results = await Promise.all(categoryFeeds.map((feed) => fetchRSSFeed(feed, category)));

	// Combine and sort by timestamp
	const allItems = results.flat();
	allItems.sort((a, b) => b.timestamp - a.timestamp);

	// Remove duplicates based on URL
	const seen = new Set<string>();
	const unique = allItems.filter((item) => {
		if (seen.has(item.link)) return false;
		seen.add(item.link);
		return true;
	});

	return unique.slice(0, 20); // Limit to 20 items per category
}

/**
 * Fetch news from all RSS feeds
 */
export async function fetchAllRSSNews(
	feeds?: Record<NewsCategory, FeedSource[]>
): Promise<Record<NewsCategory, NewsItem[]>> {
	const categories: NewsCategory[] = ['politics', 'tech', 'finance', 'gov', 'ai', 'intel'];
	const result = {} as Record<NewsCategory, NewsItem[]>;

	// Fetch sequentially to avoid overwhelming the network
	for (const category of categories) {
		result[category] = await fetchRSSNewsForCategory(category, feeds?.[category]);

		// Small delay between categories
		if (category !== categories[categories.length - 1]) {
			await new Promise((resolve) => setTimeout(resolve, 500));
		}
	}

	return result;
}
