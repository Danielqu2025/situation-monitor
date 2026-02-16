/**
 * RSS feed and news source configuration
 * Supports both English and Chinese sources
 */

import type { NewsCategory } from '$lib/types';

export interface FeedSource {
	name: string;
	url: string;
}

export interface IntelSource extends FeedSource {
	type: 'think-tank' | 'defense' | 'regional' | 'osint' | 'govt' | 'cyber';
	topics: string[];
	region?: string;
}

export type Language = 'en' | 'zh';

// Default feeds
export const FEEDS: Record<NewsCategory, FeedSource[]> = {
	politics: [
		{ name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
		{ name: 'NPR News', url: 'https://feeds.npr.org/1001/rss.xml' },
		{ name: 'Guardian World', url: 'https://www.theguardian.com/world/rss' },
		{ name: 'NYT World', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml' }
	],
	tech: [
		{ name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
		{ name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab' },
		{ name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
		{ name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/' },
		{ name: 'ArXiv AI', url: 'https://rss.arxiv.org/rss/cs.AI' },
		{ name: 'OpenAI Blog', url: 'https://openai.com/news/rss.xml' }
	],
	finance: [
		{ name: 'CNBC', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
		{ name: 'MarketWatch', url: 'https://feeds.marketwatch.com/marketwatch/topstories' },
		{ name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex' },
		{ name: 'BBC Business', url: 'https://feeds.bbci.co.uk/news/business/rss.xml' },
		{ name: 'FT', url: 'https://www.ft.com/rss/home' }
	],
	gov: [
		{ name: 'White House', url: 'https://www.whitehouse.gov/news/feed/' },
		{ name: 'Federal Reserve', url: 'https://www.federalreserve.gov/feeds/press_all.xml' },
		{ name: 'SEC Announcements', url: 'https://www.sec.gov/news/pressreleases.rss' },
		{
			name: 'DoD News',
			url: 'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?max=10&ContentType=1&Site=945'
		}
	],
	ai: [
		{ name: 'OpenAI Blog', url: 'https://openai.com/news/rss.xml' },
		{ name: 'ArXiv AI', url: 'https://rss.arxiv.org/rss/cs.AI' }
	],
	intel: [
		{ name: 'CSIS', url: 'https://www.csis.org/analysis/feed' },
		{ name: 'Brookings', url: 'https://www.brookings.edu/feed/' }
	]
};

// English recommended feeds - 15 sources
export const EN_RECOMMENDED_FEEDS: Record<NewsCategory, FeedSource[]> = {
	politics: [
		{ name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
		{ name: 'NPR News', url: 'https://feeds.npr.org/1001/rss.xml' },
		{ name: 'Guardian World', url: 'https://www.theguardian.com/world/rss' },
		{ name: 'NYT World', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml' },
		{ name: 'Politico', url: 'https://www.politico.com/rss/politics.xml' },
		{ name: 'The Hill', url: 'https://thehill.com/homenews/feed/' },
		{ name: 'Washington Post', url: 'https://www.washingtonpost.com/politics/?outputType=rss' },
		{
			name: 'Reuters',
			url: 'https://www.reutersagency.com/feed/?taxonomy=politics&post_type=reuters-best'
		},
		{ name: 'PBS NewsHour', url: 'https://www.pbs.org/newshour/feeds/rss/politics' },
		{ name: 'Vox', url: 'https://www.vox.com/rss/politics/index.xml' },
		{ name: 'AP News', url: 'https://rsshub.app/apnews/topics/politics' },
		{ name: 'Axios', url: 'https://api.axios.com/feed/politics/' },
		{ name: 'Slate', url: 'https://slate.com/feeds/politics.rss' },
		{ name: 'Daily Beast', url: 'https://feeds.thedailybeast.com/summary.rss' },
		{ name: 'FiveThirtyEight', url: 'https://fivethirtyeight.com/politics/feed/' }
	],
	tech: [
		{ name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
		{ name: 'WIRED', url: 'https://www.wired.com/feed/rss' },
		{ name: 'CNET', url: 'https://www.cnet.com/rss/news/' },
		{ name: 'Engadget', url: 'https://www.engadget.com/rss.xml' },
		{ name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
		{ name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
		{ name: 'Mashable', url: 'https://mashable.com/feed/' },
		{ name: 'Gizmodo', url: 'https://gizmodo.com/rss' },
		{ name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
		{ name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/' },
		{ name: 'VentureBeat', url: 'https://venturebeat.com/feed/' },
		{ name: 'TechRadar', url: 'https://www.techradar.com/rss' },
		{ name: 'ZDNet', url: 'https://www.zdnet.com/rss/news.xml' },
		{ name: 'Digital Trends', url: 'https://www.digitaltrends.com/feed/' },
		{ name: 'Toms Hardware', url: 'https://www.tomshardware.com/feeds/all' }
	],
	finance: [
		{ name: 'Bloomberg', url: 'https://feeds.bloomberg.com/markets/news.rss' },
		{
			name: 'Reuters',
			url: 'https://www.reutersagency.com/feed/?taxonomy=business-finance&post_type=reuters-best'
		},
		{ name: 'Financial Times', url: 'https://www.ft.com/rss/home' },
		{ name: 'CNBC', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
		{ name: 'MarketWatch', url: 'https://feeds.marketwatch.com/marketwatch/topstories' },
		{ name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex' },
		{ name: 'WSJ', url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml' },
		{ name: 'Investing.com', url: 'https://www.investing.com/rss/news.rss' },
		{ name: 'Fox Business', url: 'https://www.foxbusiness.com/rss.xml' },
		{ name: 'Seeking Alpha', url: 'https://seekingalpha.com/feed.xml' },
		{ name: 'Barrons', url: 'https://www.barrons.com/rss/rssfeed' },
		{ name: 'TheStreet', url: 'https://www.thestreet.com/.rss/full' },
		{ name: 'Motley Fool', url: 'https://www.fool.com/feeds/index.aspx' },
		{ name: 'Business Insider', url: 'https://www.businessinsider.com/rss' },
		{ name: 'Economist', url: 'https://www.economist.com/finance-and-economics/rss.xml' }
	],
	gov: [
		{ name: 'White House', url: 'https://www.whitehouse.gov/news/feed/' },
		{ name: 'Federal Reserve', url: 'https://www.federalreserve.gov/feeds/press_all.xml' },
		{ name: 'SEC', url: 'https://www.sec.gov/news/pressreleases.rss' },
		{ name: 'GovInfo', url: 'https://www.govinfo.gov/feeds/collections/BILLS/rss.xml' },
		{ name: 'Senate', url: 'https://www.senate.gov/legislative/schedule.htm' },
		{ name: 'GovExec', url: 'https://govexec.com/rss/all/' },
		{ name: 'Federal Register', url: 'https://www.govinfo.gov/feeds/collections/FR/rss.xml' },
		{ name: 'Grants.gov', url: 'https://grants.gov/connect/rss-feeds' },
		{ name: 'USA.gov', url: 'https://www.usa.gov/rss/updates.xml' },
		{ name: 'House', url: 'https://clerk.house.gov/rss.xml' },
		{ name: 'Senate News', url: 'https://www.senate.gov/news/rss.xml' },
		{ name: 'CRS Reports', url: 'https://www.everycrsreport.com/rss.xml' },
		{ name: 'GAO', url: 'https://www.gao.gov/rss/reports.xml' },
		{ name: 'Regulations.gov', url: 'https://www.regulations.gov/rss' },
		{ name: 'US Courts', url: 'https://www.uscourts.gov/rss/news.xml' }
	],
	ai: [
		{ name: 'OpenAI', url: 'https://openai.com/news/rss.xml' },
		{ name: 'ArXiv AI', url: 'https://rss.arxiv.org/rss/cs.AI' },
		{ name: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/the-batch/' },
		{ name: 'MIT AI', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/' },
		{ name: 'Google AI', url: 'https://ai.googleblog.com/feeds/posts/default' },
		{ name: 'Anthropic', url: 'https://www.anthropic.com/blog/rss.xml' },
		{ name: 'Stanford AI', url: 'https://ai.stanford.edu/news/feed/' },
		{ name: 'Fast Company', url: 'https://www.fastcompany.com/artificial-intelligence/rss' },
		{ name: 'ML Mastery', url: 'https://machinelearningmastery.com/blog/feed/' },
		{ name: 'ArXiv ML', url: 'https://rss.arxiv.org/rss/cs.LG' },
		{ name: 'AI Trends', url: 'https://www.aitrends.com/feed/' },
		{ name: 'VentureBeat AI', url: 'https://venturebeat.com/ai/feed/' },
		{ name: 'AI Journal', url: 'https://www.ajournal.co.uk/feed/' },
		{ name: 'Towards DS', url: 'https://towardsdatascience.com/feed' },
		{ name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml' }
	],
	intel: [
		{ name: 'CSIS', url: 'https://www.csis.org/analysis/feed' },
		{ name: 'Brookings', url: 'https://www.brookings.edu/feed/' },
		{ name: 'CFR', url: 'https://www.cfr.org/rss.xml' },
		{ name: 'RAND', url: 'https://www.rand.org/topics/national-security-and-terrorism.xml' },
		{ name: 'Atlantic Council', url: 'https://www.atlanticcouncil.org/feed/' },
		{ name: 'Chatham House', url: 'https://www.chathamhouse.org/feed' },
		{ name: 'Carnegie', url: 'https://carnegieendowment.org/rss.xml' },
		{ name: 'Defense One', url: 'https://www.defenseone.com/rss/all/' },
		{ name: 'War on Rocks', url: 'https://warontherocks.com/feed/' },
		{ name: 'The Diplomat', url: 'https://thediplomat.com/feed/' },
		{ name: 'IISS', url: 'https://www.iiss.org/rss' },
		{ name: 'Stratfor', url: 'https://www.stratfor.com/rss' },
		{ name: 'Janes', url: 'https://www.janes.com/rss' },
		{ name: 'Breaking Defense', url: 'https://breakingdefense.com/feed/' },
		{ name: 'RealClearDefense', url: 'https://www.realcleardefense.com/rss.xml' }
	]
};

// Chinese recommended feeds - 10-15 sources
// Note: Using accessible sources that work through CORS proxies
// Selected overseas Chinese sources and international sources accessible from anywhere
export const ZH_RECOMMENDED_FEEDS: Record<NewsCategory, FeedSource[]> = {
	politics: [
		{
			name: '路透',
			url: 'https://www.reutersagency.com/feed/?best-topics=politicalgeneral&post_type=reuters-best'
		},
		{ name: '法广中文', url: 'https://www.rfi.fr/cn/rss.xml' },
		{ name: '美国之音', url: 'https://www.voanews.com/rss/?language=zh-CN' },
		{ name: '德国之声', url: 'https://www.dw.com/zh/rss.xml' },
		{ name: 'ABC中文', url: 'https://www.abc.net.au/news/chinese/rss.xml' },
		{ name: 'Politico', url: 'https://www.politico.com/rss/politics.xml' },
		{ name: 'The Hill', url: 'https://thehill.com/rss/syndicator/19109' },
		{ name: 'Axios', url: 'https://api.axios.com/feed/politics/' },
		{ name: 'BBC国际', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
		{ name: 'AP News', url: 'https://rsshub.app/apnews/topics/apf-topnews' }
	],
	tech: [
		{ name: 'Solidot', url: 'https://www.solidot.org/feed/' },
		{ name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
		{ name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
		{ name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
		{ name: 'Wired', url: 'https://www.wired.com/feed/rss' },
		{ name: 'TechRadar', url: 'https://www.techradar.com/rss' },
		{ name: 'The Register', url: 'https://www.theregister.com/headlines.rss' },
		{ name: 'Engadget', url: 'https://www.engadget.com/rss.xml' },
		{ name: 'CNET', url: 'https://www.cnet.com/rss/news/' },
		{ name: 'MIT科技评论', url: 'https://www.technologyreview.com/feed/' }
	],
	finance: [
		{
			name: '路透',
			url: 'https://www.reutersagency.com/feed/?taxonomy=markets&post_type=reuters-best'
		},
		{ name: 'CNBC', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
		{ name: 'MarketWatch', url: 'https://feeds.content.dowjones.io/public/rss/mw_topstories' },
		{ name: 'Investing.com', url: 'https://www.investing.com/rss/news.rss' },
		{ name: 'Yahoo财经', url: 'https://finance.yahoo.com/news/rssindex' },
		{ name: 'Seeking Alpha', url: 'https://seekingalpha.com/api/v3/feed.xml' },
		{ name: 'Financial Times', url: 'https://www.ft.com/?format=rss' },
		{ name: 'Economist', url: 'https://www.economist.com/finance-and-economics/rss.xml' }
	],
	gov: [
		{ name: '香港政府', url: 'https://www.info.gov.hk/gia/rss.xml' },
		{ name: '澳门政府', url: 'https://www.gcs.gov.mo/rss.xml' },
		{ name: '白宫', url: 'https://www.whitehouse.gov/news/feed/' },
		{ name: '美联储', url: 'https://www.federalreserve.gov/feeds/press_all.xml' },
		{ name: '联合国', url: 'https://news.un.org/feed/subscribe/zh/news/all/rss.xml' },
		{ name: '世界银行', url: 'https://www.worldbank.org/en/news/rss.xml' }
	],
	ai: [
		{ name: 'MIT AI', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/' },
		{ name: 'Google AI', url: 'https://ai.googleblog.com/feeds/posts/default' },
		{ name: 'Anthropic', url: 'https://www.anthropic.com/blog/rss.xml' },
		{ name: 'OpenAI', url: 'https://openai.com/news/rss.xml' },
		{ name: 'ArXiv AI', url: 'https://rss.arxiv.org/rss/cs.AI' },
		{ name: 'VentureBeat AI', url: 'https://venturebeat.com/ai/feed/' },
		{ name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml' }
	],
	intel: [
		{ name: '法广中文', url: 'https://www.rfi.fr/cn/rss.xml' },
		{ name: '美国之音', url: 'https://www.voanews.com/rss/?language=zh-CN' },
		{ name: '德国之声', url: 'https://www.dw.com/zh/rss.xml' },
		{ name: 'The Diplomat', url: 'https://thediplomat.com/feed/' },
		{ name: 'Foreign Policy', url: 'https://foreignpolicy.com/feed/' },
		{ name: 'BBC国际', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
		{ name: 'Defense One', url: 'https://www.defenseone.com/rss/all/' },
		{ name: 'War on Rocks', url: 'https://warontherocks.com/feed/' }
	]
};

// Helper functions
export function getRecommendedFeeds(lang: Language): Record<NewsCategory, FeedSource[]> {
	return lang === 'zh' ? ZH_RECOMMENDED_FEEDS : EN_RECOMMENDED_FEEDS;
}

export function getDefaultFeeds(lang: Language): Record<NewsCategory, FeedSource[]> {
	if (lang === 'zh') {
		return {
			politics: ZH_RECOMMENDED_FEEDS.politics.slice(0, 4),
			tech: ZH_RECOMMENDED_FEEDS.tech.slice(0, 6),
			finance: ZH_RECOMMENDED_FEEDS.finance.slice(0, 5),
			gov: ZH_RECOMMENDED_FEEDS.gov.slice(0, 4),
			ai: ZH_RECOMMENDED_FEEDS.ai.slice(0, 4),
			intel: ZH_RECOMMENDED_FEEDS.intel.slice(0, 4)
		};
	}
	return FEEDS;
}

export const INTEL_SOURCES: IntelSource[] = [
	{
		name: 'CSIS',
		url: 'https://www.csis.org/analysis/feed',
		type: 'think-tank',
		topics: ['defense', 'geopolitics']
	},
	{
		name: 'Brookings',
		url: 'https://www.brookings.edu/feed/',
		type: 'think-tank',
		topics: ['policy', 'geopolitics']
	},
	{
		name: 'CFR',
		url: 'https://www.cfr.org/rss.xml',
		type: 'think-tank',
		topics: ['foreign-policy']
	},
	{
		name: 'RAND',
		url: 'https://www.rand.org/topics/national-security-and-terrorism.xml',
		type: 'think-tank',
		topics: ['security', 'defense', 'research']
	},
	{
		name: 'Atlantic Council',
		url: 'https://www.atlanticcouncil.org/feed/',
		type: 'think-tank',
		topics: ['geopolitics', 'security']
	},
	{
		name: 'Chatham House',
		url: 'https://www.chathamhouse.org/feed',
		type: 'think-tank',
		topics: ['international-affairs', 'geopolitics']
	},
	{
		name: 'Carnegie',
		url: 'https://carnegieendowment.org/rss.xml',
		type: 'think-tank',
		topics: ['international-peace', 'policy']
	},
	{
		name: 'Defense One',
		url: 'https://www.defenseone.com/rss/all/',
		type: 'defense',
		topics: ['military', 'defense']
	},
	{
		name: 'War on Rocks',
		url: 'https://warontherocks.com/feed/',
		type: 'defense',
		topics: ['military', 'strategy']
	},
	{
		name: 'Breaking Defense',
		url: 'https://breakingdefense.com/feed/',
		type: 'defense',
		topics: ['military', 'defense']
	},
	{
		name: 'The Drive',
		url: 'https://www.thedrive.com/the-war-zone/feed',
		type: 'defense',
		topics: ['military']
	},
	{
		name: 'The Diplomat',
		url: 'https://thediplomat.com/feed/',
		type: 'regional',
		topics: ['asia-pacific'],
		region: 'APAC'
	},
	{
		name: 'Al-Monitor',
		url: 'https://www.al-monitor.com/rss',
		type: 'regional',
		topics: ['middle-east'],
		region: 'MENA'
	},
	{
		name: 'Bellingcat',
		url: 'https://www.bellingcat.com/feed/',
		type: 'osint',
		topics: ['investigation', 'osint']
	},
	{
		name: 'CISA',
		url: 'https://www.cisa.gov/uscert/ncas/alerts.xml',
		type: 'cyber',
		topics: ['cyber', 'security']
	},
	{
		name: 'Krebs',
		url: 'https://krebsonsecurity.com/feed/',
		type: 'cyber',
		topics: ['cyber', 'security']
	}
];

export const CATEGORY_NAMES: Record<NewsCategory, string> = {
	politics: 'Politics',
	tech: 'Technology',
	finance: 'Finance',
	gov: 'Government',
	ai: 'AI & ML',
	intel: 'Intelligence'
};

export const CATEGORY_DESCRIPTIONS: Record<NewsCategory, string> = {
	politics: 'Political news and analysis',
	tech: 'Technology news and innovation',
	finance: 'Financial markets and business',
	gov: 'Government announcements',
	ai: 'AI and machine learning',
	intel: 'Geopolitics and defense'
};
