/**
 * API barrel exports
 */

// News APIs - Unified API handles language switching automatically
export { fetchNews, fetchCategoryNews, fetchAllNews } from './unified-news';

// Direct access to underlying APIs if needed
export { fetchCategoryNews as fetchGDELTNews, fetchAllNews as fetchAllGDELTNews } from './news';
export { fetchRSSNewsForCategory, fetchAllRSSNews } from './rss';

// Market APIs
export {
	fetchCryptoPrices,
	fetchIndices,
	fetchSectorPerformance,
	fetchCommodities,
	fetchAllMarkets
} from './markets';

// Misc APIs
export { fetchPolymarket, fetchWhaleTransactions, fetchGovContracts, fetchLayoffs } from './misc';
export type { Prediction, WhaleTransaction, Contract, Layoff } from './misc';

// Leaders API
export { fetchWorldLeaders } from './leaders';

// Fed API
export { fetchFedIndicators, fetchFedNews, isFredConfigured } from './fred';
export type { FedIndicators, EconomicIndicator, FedNewsItem, FedNewsType } from './fred';
