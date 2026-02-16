<script lang="ts">
	import type { NewsItem } from '$lib/types';
	import { timeAgo } from '$lib/utils';
	import {
		translate,
		getCachedTranslation,
		loadTranslationConfig
	} from '$lib/services/translation';

	interface Props {
		item: NewsItem;
		showSource?: boolean;
		showAlert?: boolean;
		showDescription?: boolean;
		compact?: boolean;
	}

	let {
		item,
		showSource = true,
		showAlert = true,
		showDescription = false,
		compact = false
	}: Props = $props();

	// Translation state
	let translatedTitle = $state<string | null>(null);
	let isTranslating = $state(false);
	let showOriginal = $state(false);

	// Check if translation is enabled and target language is not English
	const translationConfig = loadTranslationConfig();
	const shouldTranslate = translationConfig.enabled && translationConfig.targetLanguage !== 'en';

	// Check cache on mount
	$effect(() => {
		if (shouldTranslate && item.title) {
			const cached = getCachedTranslation(item.title, translationConfig.targetLanguage);
			if (cached) {
				translatedTitle = cached;
			}
		}
	});

	// Auto-translate when item changes
	$effect(() => {
		if (shouldTranslate && item.title && !translatedTitle && !isTranslating) {
			performTranslation();
		}
	});

	async function performTranslation() {
		if (!item.title || isTranslating) return;

		isTranslating = true;

		try {
			const result = await translate(item.title);
			if (result !== item.title) {
				translatedTitle = result;
			}
		} catch (e) {
			console.warn('Translation failed:', e);
		} finally {
			isTranslating = false;
		}
	}

	function toggleShowOriginal() {
		showOriginal = !showOriginal;
	}

	// Display title (translated or original)
	const displayTitle = $derived(showOriginal || !translatedTitle ? item.title : translatedTitle);

	const hasTranslation = $derived(translatedTitle !== null && translatedTitle !== item.title);
</script>

<div
	class="news-item"
	class:alert={showAlert && item.isAlert}
	class:compact
	class:translated={hasTranslation}
>
	{#if showSource}
		<div class="item-source">
			<span>{item.source}</span>
			{#if showAlert && item.isAlert}
				<span class="alert-tag">ALERT</span>
			{/if}
			{#if isTranslating}
				<span class="translating-indicator">翻译中...</span>
			{/if}
		</div>
	{/if}

	<a class="item-title" href={item.link} target="_blank" rel="noopener noreferrer">
		{displayTitle}
	</a>

	{#if hasTranslation}
		<button class="translation-toggle" onclick={toggleShowOriginal}>
			{showOriginal ? '显示翻译' : '显示原文'}
		</button>
	{/if}

	{#if showDescription && item.description}
		<p class="item-description">{item.description}</p>
	{/if}

	<div class="item-meta">
		<span class="item-time">{timeAgo(item.timestamp)}</span>
		{#if item.region}
			<span class="item-region">{item.region}</span>
		{/if}
	</div>
</div>

<style>
	.news-item {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.news-item:last-child {
		border-bottom: none;
	}

	.news-item.compact {
		padding: 0.35rem 0;
	}

	.news-item.alert {
		background: rgba(255, 68, 68, 0.08);
		margin: 0 -0.5rem;
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid rgba(255, 68, 68, 0.2);
		border-bottom: 1px solid rgba(255, 68, 68, 0.2);
	}

	.news-item.translated {
		border-left: 2px solid var(--accent);
		padding-left: 0.5rem;
	}

	.item-source {
		font-size: 0.55rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.03em;
		margin-bottom: 0.2rem;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.alert-tag {
		background: var(--danger);
		color: white;
		font-size: 0.5rem;
		padding: 0.1rem 0.3rem;
		border-radius: 2px;
		font-weight: 600;
	}

	.translating-indicator {
		font-size: 0.5rem;
		color: var(--accent);
		font-style: italic;
	}

	.item-title {
		display: block;
		font-size: 0.7rem;
		line-height: 1.35;
		color: var(--text-primary);
		text-decoration: none;
	}

	.item-title:hover {
		color: var(--accent);
	}

	.compact .item-title {
		font-size: 0.65rem;
		line-height: 1.3;
	}

	.translation-toggle {
		background: transparent;
		border: none;
		color: var(--accent);
		font-size: 0.55rem;
		cursor: pointer;
		padding: 0;
		margin-top: 0.2rem;
		text-decoration: underline;
		opacity: 0.8;
	}

	.translation-toggle:hover {
		opacity: 1;
	}

	.item-description {
		font-size: 0.6rem;
		color: var(--text-secondary);
		margin: 0.3rem 0 0;
		line-height: 1.4;
	}

	.item-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.item-time {
		font-size: 0.55rem;
		color: var(--text-muted);
	}

	.item-region {
		font-size: 0.5rem;
		color: var(--accent);
		background: rgba(var(--accent-rgb), 0.1);
		padding: 0.1rem 0.3rem;
		border-radius: 2px;
		text-transform: uppercase;
	}
</style>
