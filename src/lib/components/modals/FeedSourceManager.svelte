<script lang="ts">
	import { feedSources, recommendedFeeds } from '$lib/stores/feedSources';
	import { type FeedSource } from '$lib/config';
	import { t } from '$lib/stores';
	import type { NewsCategory } from '$lib/types';

	// Available categories
	const categories: NewsCategory[] = ['politics', 'tech', 'finance', 'gov', 'ai', 'intel'];

	// State
	let activeCategory: NewsCategory = $state('politics');
	let showAddForm = $state(false);
	let newSourceName = $state('');
	let newSourceUrl = $state('');
	let showRecommended = $state(false);
	let errorMessage = $state('');

	// Get current sources for active category
	let currentSources = $derived($feedSources.sources[activeCategory] || []);

	// Get available recommended sources (language-aware)
	let availableRecommended = $derived(
		($recommendedFeeds[activeCategory] || []).filter(
			(rec: FeedSource) => !currentSources.some((curr: FeedSource) => curr.url === rec.url)
		)
	);

	function handleCategoryChange(category: NewsCategory) {
		activeCategory = category;
		showAddForm = false;
		showRecommended = false;
		errorMessage = '';
		newSourceName = '';
		newSourceUrl = '';
	}

	function handleAddSource() {
		errorMessage = '';

		if (!newSourceName.trim()) {
			errorMessage = $t.enterSourceName;
			return;
		}

		if (!newSourceUrl.trim()) {
			errorMessage = $t.enterFeedUrl;
			return;
		}

		// Basic URL validation
		let url = newSourceUrl.trim();
		if (!url.startsWith('http://') && !url.startsWith('https://')) {
			errorMessage = $t.urlMustStartWithHttp;
			return;
		}

		// Check for duplicates
		const exists = currentSources.some(
			(s) => s.url === url || s.name.toLowerCase() === newSourceName.trim().toLowerCase()
		);
		if (exists) {
			errorMessage = $t.duplicateSourceError;
			return;
		}

		feedSources.addSource(activeCategory, {
			name: newSourceName.trim(),
			url: url
		});

		// Reset form
		newSourceName = '';
		newSourceUrl = '';
		showAddForm = false;
	}

	function handleRemoveSource(url: string) {
		feedSources.removeSource(activeCategory, url);
	}

	function handleAddRecommended(source: FeedSource) {
		feedSources.addSource(activeCategory, source);
	}

	function handleResetCategory() {
		if (confirm(`${$t.resetCategory}: ${$t.categories[activeCategory]}?`)) {
			feedSources.resetCategory(activeCategory);
		}
	}

	function handleResetAll() {
		if (confirm($t.resetAllSources)) {
			feedSources.resetAll();
		}
	}
</script>

<div class="feed-manager">
	<!-- Category tabs -->
	<div class="category-tabs">
		{#each categories as category}
			<button
				class="category-tab"
				class:active={activeCategory === category}
				onclick={() => handleCategoryChange(category)}
			>
				{$t.categories[category]}
			</button>
		{/each}
	</div>

	<!-- Current sources -->
	<div class="sources-section">
		<div class="section-header">
			<h4 class="section-title">
				{$t.currentSources}
				<span class="source-count">({currentSources.length})</span>
			</h4>
			<div class="section-actions">
				<button
					class="action-btn add-btn"
					onclick={() => {
						showAddForm = true;
						showRecommended = false;
					}}
					title={$t.customSource}
				>
					+ {$t.customSource}
				</button>
				<button
					class="action-btn recommend-btn"
					onclick={() => {
						showRecommended = true;
						showAddForm = false;
					}}
					disabled={availableRecommended.length === 0}
					title={$t.recommendedSources}
				>
					+ {$t.recommendedSources} ({availableRecommended.length})
				</button>
			</div>
		</div>

		{#if currentSources.length === 0}
			<div class="empty-state">
				<p>{$t.noSourcesConfigured}</p>
				<button class="link-btn" onclick={() => (showRecommended = true)}>
					{$t.addRecommendedSources}
				</button>
			</div>
		{:else}
			<ul class="sources-list">
				{#each currentSources as source (source.url)}
					<li class="source-item">
						<div class="source-info">
							<span class="source-name">{source.name}</span>
							<span class="source-url">{source.url}</span>
						</div>
						<button
							class="remove-btn"
							onclick={() => handleRemoveSource(source.url)}
							title={$t.remove}
						>
							×
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Add custom source form -->
	{#if showAddForm}
		<div class="form-section">
			<h4 class="form-title">{$t.addCustomSource}</h4>
			{#if errorMessage}
				<div class="error-message">{errorMessage}</div>
			{/if}
			<div class="form-group">
				<label for="source-name">{$t.sourceName}</label>
				<input
					id="source-name"
					type="text"
					bind:value={newSourceName}
					placeholder="e.g., My News Source"
				/>
			</div>
			<div class="form-group">
				<label for="source-url">{$t.feedUrl}</label>
				<input
					id="source-url"
					type="url"
					bind:value={newSourceUrl}
					placeholder="https://example.com/feed.xml"
				/>
			</div>
			<div class="form-actions">
				<button class="btn-secondary" onclick={() => (showAddForm = false)}>{$t.cancel}</button>
				<button class="btn-primary" onclick={handleAddSource}>{$t.add}</button>
			</div>
		</div>
	{/if}

	<!-- Recommended sources -->
	{#if showRecommended}
		<div class="recommended-section">
			<h4 class="form-title">{$t.recommendedSources}</h4>
			{#if availableRecommended.length === 0}
				<p class="empty-text">{$t.allRecommendedAdded}</p>
			{:else}
				<ul class="recommended-list">
					{#each availableRecommended as source (source.url)}
						<li class="recommended-item">
							<div class="source-info">
								<span class="source-name">{source.name}</span>
								<span class="source-url">{source.url}</span>
							</div>
							<button class="add-source-btn" onclick={() => handleAddRecommended(source)}>
								+ {$t.add}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}

	<!-- Reset options -->
	<div class="reset-section">
		<button class="reset-link" onclick={handleResetCategory}>
			{$t.resetCategory}: {$t.categories[activeCategory]}
		</button>
		{#if $feedSources.isCustomized}
			<button class="reset-link reset-all" onclick={handleResetAll}>
				{$t.resetAllSources}
			</button>
		{/if}
	</div>
</div>

<style>
	.feed-manager {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.category-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	.category-tab {
		padding: 0.4rem 0.75rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 4px;
		color: var(--text-secondary);
		font-size: 0.7rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.category-tab:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
	}

	.category-tab.active {
		background: rgba(var(--accent-rgb), 0.2);
		border-color: var(--accent);
		color: var(--accent);
	}

	.sources-section {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.section-title {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-primary);
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.source-count {
		font-weight: 400;
		color: var(--text-muted);
	}

	.section-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.action-btn {
		padding: 0.35rem 0.6rem;
		background: rgba(var(--accent-rgb), 0.1);
		border: 1px solid rgba(var(--accent-rgb), 0.3);
		border-radius: 4px;
		color: var(--accent);
		font-size: 0.6rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.action-btn:hover:not(:disabled) {
		background: rgba(var(--accent-rgb), 0.2);
	}

	.action-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.empty-state {
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px dashed var(--border);
		border-radius: 4px;
		text-align: center;
		color: var(--text-muted);
	}

	.empty-state p {
		margin: 0 0 0.5rem;
		font-size: 0.7rem;
	}

	.link-btn {
		background: transparent;
		border: none;
		color: var(--accent);
		font-size: 0.7rem;
		cursor: pointer;
		text-decoration: underline;
	}

	.link-btn:hover {
		color: var(--accent-hover);
	}

	.sources-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 200px;
		overflow-y: auto;
	}

	.source-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border);
		border-radius: 4px;
		gap: 0.5rem;
	}

	.source-info {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
		flex: 1;
	}

	.source-name {
		font-size: 0.7rem;
		color: var(--text-primary);
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.source-url {
		font-size: 0.55rem;
		color: var(--text-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-family: monospace;
	}

	.remove-btn {
		width: 24px;
		height: 24px;
		background: rgba(255, 68, 68, 0.1);
		border: 1px solid rgba(255, 68, 68, 0.3);
		border-radius: 4px;
		color: var(--danger);
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s ease;
		flex-shrink: 0;
	}

	.remove-btn:hover {
		background: rgba(255, 68, 68, 0.2);
	}

	.form-section,
	.recommended-section {
		padding: 1rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.form-title {
		margin: 0;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.error-message {
		padding: 0.5rem;
		background: rgba(255, 68, 68, 0.1);
		border: 1px solid rgba(255, 68, 68, 0.3);
		border-radius: 4px;
		color: var(--danger);
		font-size: 0.65rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.form-group label {
		font-size: 0.65rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.form-group input {
		padding: 0.4rem 0.6rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid var(--border);
		border-radius: 4px;
		color: var(--text-primary);
		font-size: 0.7rem;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--accent);
	}

	.form-actions {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}

	.btn-secondary {
		padding: 0.4rem 0.75rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 4px;
		color: var(--text-secondary);
		font-size: 0.65rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-primary);
	}

	.btn-primary {
		padding: 0.4rem 0.75rem;
		background: rgba(var(--accent-rgb), 0.2);
		border: 1px solid var(--accent);
		border-radius: 4px;
		color: var(--accent);
		font-size: 0.65rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.btn-primary:hover {
		background: rgba(var(--accent-rgb), 0.3);
	}

	.empty-text {
		margin: 0;
		font-size: 0.7rem;
		color: var(--text-muted);
		font-style: italic;
	}

	.recommended-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 200px;
		overflow-y: auto;
	}

	.recommended-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border);
		border-radius: 4px;
		gap: 0.5rem;
	}

	.add-source-btn {
		padding: 0.3rem 0.6rem;
		background: rgba(0, 255, 136, 0.1);
		border: 1px solid rgba(0, 255, 136, 0.3);
		border-radius: 4px;
		color: var(--accent);
		font-size: 0.6rem;
		cursor: pointer;
		transition: all 0.15s ease;
		flex-shrink: 0;
	}

	.add-source-btn:hover {
		background: rgba(0, 255, 136, 0.2);
	}

	.reset-section {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		padding-top: 0.5rem;
		border-top: 1px solid var(--border);
	}

	.reset-link {
		background: transparent;
		border: none;
		color: var(--text-muted);
		font-size: 0.6rem;
		cursor: pointer;
		text-decoration: underline;
		transition: color 0.15s ease;
	}

	.reset-link:hover {
		color: var(--danger);
	}

	.reset-all {
		color: var(--danger);
	}

	.reset-all:hover {
		color: #ff6666;
	}
</style>
