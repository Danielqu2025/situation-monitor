/**
 * Internationalization (i18n) configuration
 * Supports English and Chinese
 */

export type Language = 'en' | 'zh';

export interface Translations {
	// App
	appTitle: string;
	appDescription: string;

	// Header
	lastUpdated: string;
	neverRefreshed: string;
	refreshing: string;
	settings: string;

	// Language
	language: string;
	english: string;
	chinese: string;

	// Settings Modal
	settingsTitle: string;
	enabledPanels: string;
	panelsDescription: string;
	dashboard: string;
	reconfigureDashboard: string;
	reconfigureHint: string;
	resetAllSettings: string;

	// Panel Names
	panels: {
		map: string;
		politics: string;
		tech: string;
		finance: string;
		gov: string;
		heatmap: string;
		markets: string;
		monitors: string;
		commodities: string;
		crypto: string;
		polymarket: string;
		whales: string;
		mainchar: string;
		printer: string;
		contracts: string;
		ai: string;
		layoffs: string;
		venezuela: string;
		greenland: string;
		iran: string;
		leaders: string;
		intel: string;
		correlation: string;
		narrative: string;
		fed: string;
	};

	// Empty States
	noNewsAvailable: string;
	noMarketData: string;
	noCommodityData: string;
	noCryptoData: string;
	noSectorData: string;
	noIntelAvailable: string;
	noFedNews: string;
	noLeadersData: string;
	noMonitorsConfigured: string;
	createMonitor: string;

	// Monitors Panel
	customMonitors: string;
	active: string;
	inactive: string;
	enable: string;
	disable: string;
	edit: string;
	delete: string;

	// Onboarding
	welcomeTitle: string;
	welcomeSubtitle: string;
	changeLaterHint: string;
	presets: {
		newsJunkie: string;
		trader: string;
		geopolitics: string;
		intel: string;
		minimal: string;
		everything: string;
	};
	presetDescriptions: {
		newsJunkie: string;
		trader: string;
		geopolitics: string;
		intel: string;
		minimal: string;
		everything: string;
	};
	panelsCount: string;

	// Time
	justNow: string;
	minutesAgo: string;
	hoursAgo: string;
	daysAgo: string;

	// Priority
	priority: string;

	// Actions
	close: string;
	save: string;
	cancel: string;
	add: string;
	remove: string;

	// Feed Sources
	feedSources: string;
	feedSourcesDescription: string;

	// Translation Section
	translation: string;
	currentSources: string;
	customSource: string;
	recommendedSources: string;
	addCustomSource: string;
	sourceName: string;
	feedUrl: string;
	resetCategory: string;
	resetAllSources: string;
	noSourcesConfigured: string;
	addRecommendedSources: string;
	allRecommendedAdded: string;
	urlMustStartWithHttp: string;
	duplicateSourceError: string;
	enterSourceName: string;
	enterFeedUrl: string;

	// Translation
	enableTranslation: string;
	translationDesc: string;
	translationProvider: string;
	status: string;
	checking: string;
	online: string;
	offline: string;
	modelsAvailable: string;
	checkAgain: string;
	ollamaSetupHint: string;
	installOllama: string;
	pullModel: string;
	startOllama: string;
	downloadOllama: string;
	selectModel: string;
	libreTranslateDesc: string;
	translatedFrom: string;
	showOriginal: string;

	// Categories
	categories: {
		politics: string;
		tech: string;
		finance: string;
		gov: string;
		ai: string;
		intel: string;
	};

	// Map legend
	mapLegend: {
		high: string;
		elevated: string;
		low: string;
	};

	// Situation panel
	situation: {
		venezuelaTitle: string;
		venezuelaSubtitle: string;
		greenlandTitle: string;
		greenlandSubtitle: string;
		iranTitle: string;
		iranSubtitle: string;
		noRecentNews: string;
		monitoring: string;
		elevated: string;
		critical: string;
	};
}

const translations: Record<Language, Translations> = {
	en: {
		appTitle: 'SITUATION MONITOR',
		appDescription: 'Real-time global situation monitoring dashboard',

		lastUpdated: 'Last updated',
		neverRefreshed: 'Never refreshed',
		refreshing: 'Refreshing...',
		settings: 'Settings',

		language: 'Language',
		english: 'English',
		chinese: '中文',

		settingsTitle: 'Settings',
		enabledPanels: 'Enabled Panels',
		panelsDescription: 'Toggle panels on/off to customize your dashboard',
		dashboard: 'Dashboard',
		reconfigureDashboard: 'Reconfigure Dashboard',
		reconfigureHint: 'Choose a preset profile for your panels',
		resetAllSettings: 'Reset All Settings',

		panels: {
			map: 'Global Map',
			politics: 'World / Geopolitical',
			tech: 'Technology / AI',
			finance: 'Financial',
			gov: 'Government / Policy',
			heatmap: 'Sector Heatmap',
			markets: 'Markets',
			monitors: 'My Monitors',
			commodities: 'Commodities / VIX',
			crypto: 'Crypto',
			polymarket: 'Polymarket',
			whales: 'Whale Watch',
			mainchar: 'Main Character',
			printer: 'Money Printer',
			contracts: 'Gov Contracts',
			ai: 'AI Arms Race',
			layoffs: 'Layoffs Tracker',
			venezuela: 'Venezuela Situation',
			greenland: 'Greenland Situation',
			iran: 'Iran Situation',
			leaders: 'World Leaders',
			intel: 'Intel Feed',
			correlation: 'Correlation Engine',
			narrative: 'Narrative Tracker',
			fed: 'Federal Reserve'
		},

		noNewsAvailable: 'No news available',
		noMarketData: 'No market data available',
		noCommodityData: 'No commodity data available',
		noCryptoData: 'No crypto data available',
		noSectorData: 'No sector data available',
		noIntelAvailable: 'No intel available',
		noFedNews: 'No Fed news available',
		noLeadersData: 'No leaders data available',
		noMonitorsConfigured: 'No monitors configured',
		createMonitor: '+ Create Monitor',

		customMonitors: 'Custom Monitors',
		active: 'active',
		inactive: 'inactive',
		enable: 'Enable',
		disable: 'Disable',
		edit: 'Edit',
		delete: 'Delete',

		welcomeTitle: 'Welcome to Situation Monitor',
		welcomeSubtitle: 'Choose a dashboard configuration to get started',
		changeLaterHint: 'You can change this later in Settings',
		presets: {
			newsJunkie: 'News Junkie',
			trader: 'Trader',
			geopolitics: 'Geopolitics Watcher',
			intel: 'Intelligence Analyst',
			minimal: 'Minimal',
			everything: 'Everything'
		},
		presetDescriptions: {
			newsJunkie: 'Stay on top of breaking news across politics, tech, and finance',
			trader: 'Market-focused dashboard with stocks, crypto, and commodities',
			geopolitics: 'Global situation awareness and regional hotspots',
			intel: 'Deep analysis, pattern detection, and narrative tracking',
			minimal: 'Just the essentials - map, news, and markets',
			everything: 'Kitchen sink - all panels enabled'
		},
		panelsCount: 'panels',

		justNow: 'just now',
		minutesAgo: 'minutes ago',
		hoursAgo: 'hours ago',
		daysAgo: 'days ago',

		priority: 'P',

		close: 'Close',
		save: 'Save',
		cancel: 'Cancel',
		add: 'Add',
		remove: 'Remove',

		feedSources: 'Feed Sources',
		feedSourcesDescription: 'Manage RSS feed sources for news categories',
		translation: 'Translation',
		currentSources: 'Current Sources',
		customSource: 'Custom',
		recommendedSources: 'Recommended',
		addCustomSource: 'Add Custom Source',
		sourceName: 'Source Name',
		feedUrl: 'RSS Feed URL',
		resetCategory: 'Reset to defaults',
		resetAllSources: 'Reset all sources to defaults',
		noSourcesConfigured: 'No sources configured for this category.',
		addRecommendedSources: 'Add recommended sources',
		allRecommendedAdded: 'All recommended sources have been added.',
		urlMustStartWithHttp: 'URL must start with http:// or https://',
		duplicateSourceError: 'A source with this name or URL already exists',
		enterSourceName: 'Please enter a source name',
		enterFeedUrl: 'Please enter a feed URL',

		enableTranslation: 'Enable auto-translation',
		translationDesc:
			'Automatically translate news headlines to your preferred language using local AI (free)',
		translationProvider: 'Translation Provider',
		status: 'Status',
		checking: 'Checking',
		online: 'Online',
		offline: 'Offline',
		modelsAvailable: 'models available',
		checkAgain: 'Check',
		ollamaSetupHint: 'Ollama not detected. To use local translation:',
		installOllama: 'Download and install Ollama',
		pullModel: 'Pull a translation model (e.g., qwen2.5:3b)',
		startOllama: 'Start Ollama service',
		downloadOllama: 'Download Ollama',
		selectModel: 'Select Model',
		libreTranslateDesc: 'Uses LibreTranslate public API. Free but may have rate limits.',
		translatedFrom: 'Translated from',
		showOriginal: 'Show original',

		categories: {
			politics: 'Politics',
			tech: 'Technology',
			finance: 'Finance',
			gov: 'Government',
			ai: 'AI',
			intel: 'Intelligence'
		},

		mapLegend: {
			high: 'High',
			elevated: 'Elevated',
			low: 'Low'
		},

		situation: {
			venezuelaTitle: 'Venezuela Watch',
			venezuelaSubtitle: 'Humanitarian crisis monitoring',
			greenlandTitle: 'Greenland Watch',
			greenlandSubtitle: 'Arctic geopolitics monitoring',
			iranTitle: 'Iran Crisis',
			iranSubtitle: 'Revolution protests, regime instability & nuclear program',
			noRecentNews: 'No recent news',
			monitoring: 'MONITORING',
			elevated: 'ELEVATED',
			critical: 'CRITICAL'
		}
	},

	zh: {
		appTitle: '情境监控器',
		appDescription: '实时监控全球政治、金融、地缘政治的动态仪表板',

		lastUpdated: '最后更新',
		neverRefreshed: '从未刷新',
		refreshing: '刷新中...',
		settings: '设置',

		language: '语言',
		english: 'English',
		chinese: '中文',

		settingsTitle: '设置',
		enabledPanels: '启用的面板',
		panelsDescription: '开启或关闭面板以自定义您的仪表板',
		dashboard: '仪表板',
		reconfigureDashboard: '重新配置仪表板',
		reconfigureHint: '为您的面板选择一个预设配置',
		resetAllSettings: '重置所有设置',

		panels: {
			map: '全球地图',
			politics: '世界/地缘政治',
			tech: '科技/人工智能',
			finance: '金融',
			gov: '政府/政策',
			heatmap: '行业热力图',
			markets: '市场',
			monitors: '我的监控器',
			commodities: '商品/VIX',
			crypto: '加密货币',
			polymarket: 'Polymarket',
			whales: '巨鲸观察',
			mainchar: '主角追踪',
			printer: '印钞机',
			contracts: '政府合同',
			ai: 'AI军备竞赛',
			layoffs: '裁员追踪',
			venezuela: '委内瑞拉局势',
			greenland: '格陵兰局势',
			iran: '伊朗局势',
			leaders: '世界领导人',
			intel: '情报源',
			correlation: '关联引擎',
			narrative: '叙事追踪',
			fed: '美联储'
		},

		noNewsAvailable: '暂无新闻',
		noMarketData: '暂无市场数据',
		noCommodityData: '暂无商品数据',
		noCryptoData: '暂无加密货币数据',
		noSectorData: '暂无行业数据',
		noIntelAvailable: '暂无情报数据',
		noFedNews: '暂无美联储新闻',
		noLeadersData: '暂无领导人数据',
		noMonitorsConfigured: '未配置监控器',
		createMonitor: '+ 创建监控器',

		customMonitors: '自定义监控器',
		active: '个活跃',
		inactive: '个非活跃',
		enable: '启用',
		disable: '禁用',
		edit: '编辑',
		delete: '删除',

		welcomeTitle: '欢迎使用情境监控器',
		welcomeSubtitle: '选择一个仪表板配置开始使用',
		changeLaterHint: '您可以稍后在设置中更改此配置',
		presets: {
			newsJunkie: '新闻达人',
			trader: '交易员',
			geopolitics: '地缘政治观察员',
			intel: '情报分析师',
			minimal: '极简',
			everything: '全部显示'
		},
		presetDescriptions: {
			newsJunkie: '关注政治、科技和金融领域的突发新闻',
			trader: '专注于股票、加密货币和商品的市场仪表板',
			geopolitics: '全球态势感知和地区热点监控',
			intel: '深度分析、模式检测和叙事追踪',
			minimal: '仅显示基本内容 - 地图、新闻和市场',
			everything: '显示所有面板'
		},
		panelsCount: '个面板',

		justNow: '刚刚',
		minutesAgo: '分钟前',
		hoursAgo: '小时前',
		daysAgo: '天前',

		priority: '优先级',

		close: '关闭',
		save: '保存',
		cancel: '取消',
		add: '添加',
		remove: '移除',

		feedSources: '数据源',
		feedSourcesDescription: '管理新闻类别的RSS数据源',
		translation: '翻译',
		currentSources: '当前数据源',
		customSource: '自定义',
		recommendedSources: '推荐',
		addCustomSource: '添加自定义数据源',
		sourceName: '数据源名称',
		feedUrl: 'RSS订阅地址',
		resetCategory: '重置为默认',
		resetAllSources: '重置所有数据源为默认',
		noSourcesConfigured: '该类别尚未配置数据源。',
		addRecommendedSources: '添加推荐数据源',
		allRecommendedAdded: '所有推荐数据源已添加完毕。',
		urlMustStartWithHttp: 'URL必须以http://或https://开头',
		duplicateSourceError: '已存在同名或同URL的数据源',
		enterSourceName: '请输入数据源名称',
		enterFeedUrl: '请输入订阅地址',

		enableTranslation: '启用自动翻译',
		translationDesc: '使用本地AI自动翻译新闻标题到您的首选语言（免费）',
		translationProvider: '翻译提供商',
		status: '状态',
		checking: '检测中',
		online: '在线',
		offline: '离线',
		modelsAvailable: '个模型可用',
		checkAgain: '重新检测',
		ollamaSetupHint: '未检测到Ollama。要使用本地翻译：',
		installOllama: '下载并安装Ollama',
		pullModel: '拉取翻译模型（如：qwen2.5:3b）',
		startOllama: '启动Ollama服务',
		downloadOllama: '下载Ollama',
		selectModel: '选择模型',
		libreTranslateDesc: '使用LibreTranslate公共API。免费但可能有速率限制。',
		translatedFrom: '翻译自',
		showOriginal: '显示原文',

		categories: {
			politics: '政治',
			tech: '科技',
			finance: '金融',
			gov: '政府',
			ai: '人工智能',
			intel: '情报'
		},

		mapLegend: {
			high: '高',
			elevated: '中等',
			low: '低'
		},

		situation: {
			venezuelaTitle: '委内瑞拉局势',
			venezuelaSubtitle: '人道主义危机监控',
			greenlandTitle: '格陵兰局势',
			greenlandSubtitle: '北极地缘政治监控',
			iranTitle: '伊朗危机',
			iranSubtitle: '革命抗议、政权不稳定与核计划',
			noRecentNews: '暂无近期新闻',
			monitoring: '监控中',
			elevated: '警戒',
			critical: '严重'
		}
	}
};

let currentLanguage: Language = 'en';

export function setLanguage(lang: Language) {
	currentLanguage = lang;
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('language', lang);
	}
}

export function getLanguage(): Language {
	if (typeof localStorage !== 'undefined') {
		const saved = localStorage.getItem('language') as Language;
		if (saved && (saved === 'en' || saved === 'zh')) {
			return saved;
		}
	}
	return currentLanguage;
}

export function t(key: string): string {
	const lang = getLanguage();
	const keys = key.split('.');
	let value: unknown = translations[lang];

	for (const k of keys) {
		if (value && typeof value === 'object' && k in value) {
			value = (value as Record<string, unknown>)[k];
		} else {
			return key; // Return key if translation not found
		}
	}

	return typeof value === 'string' ? value : key;
}

export function getPanelName(panelId: string): string {
	return t(`panels.${panelId}`);
}

export function getPresetName(presetId: string): string {
	const presetMap: Record<string, string> = {
		'news-junkie': 'presets.newsJunkie',
		trader: 'presets.trader',
		geopolitics: 'presets.geopolitics',
		intel: 'presets.intel',
		minimal: 'presets.minimal',
		everything: 'presets.everything'
	};
	return t(presetMap[presetId] || presetId);
}

export function getPresetDescription(presetId: string): string {
	const presetMap: Record<string, string> = {
		'news-junkie': 'presetDescriptions.newsJunkie',
		trader: 'presetDescriptions.trader',
		geopolitics: 'presetDescriptions.geopolitics',
		intel: 'presetDescriptions.intel',
		minimal: 'presetDescriptions.minimal',
		everything: 'presetDescriptions.everything'
	};
	return t(presetMap[presetId] || presetId);
}

export { translations };
export default translations;
