<script lang="ts">
	import { t } from '$lib/stores';
	import {
		loadTranslationConfig,
		saveTranslationConfig,
		checkOllamaStatus,
		type TranslationConfig
	} from '$lib/services/translation';

	// Load current config
	let config = $state<TranslationConfig>(loadTranslationConfig());
	let ollamaStatus = $state<{ available: boolean; models?: string[]; error?: string } | null>(null);
	let isChecking = $state(false);

	// Check Ollama status when component mounts or URL changes
	async function checkStatus() {
		if (config.provider !== 'ollama') return;

		isChecking = true;
		ollamaStatus = await checkOllamaStatus(config.ollamaUrl);
		isChecking = false;
	}

	// Save config when it changes
	function handleToggleEnabled() {
		config.enabled = !config.enabled;
		saveTranslationConfig({ enabled: config.enabled });
	}

	function handleProviderChange(newProvider: TranslationConfig['provider']) {
		config.provider = newProvider;
		saveTranslationConfig({ provider: newProvider });
		if (newProvider === 'ollama') {
			checkStatus();
		}
	}

	function handleModelChange(model: string) {
		config.ollamaModel = model;
		saveTranslationConfig({ ollamaModel: model });
	}

	// Check status on mount
	$effect(() => {
		if (config.provider === 'ollama') {
			checkStatus();
		}
	});
</script>

<div class="translation-settings">
	<div class="setting-row">
		<label class="toggle-label">
			<input type="checkbox" checked={config.enabled} onchange={handleToggleEnabled} />
			<span class="toggle-text">{$t.enableTranslation}</span>
		</label>
		<p class="setting-desc">{$t.translationDesc}</p>
	</div>

	{#if config.enabled}
		<div class="setting-row">
			<h4 class="setting-title">{$t.translationProvider}</h4>
			<div class="provider-options">
				<label class="provider-option" class:selected={config.provider === 'ollama'}>
					<input
						type="radio"
						name="provider"
						value="ollama"
						checked={config.provider === 'ollama'}
						onchange={() => handleProviderChange('ollama')}
					/>
					<div class="provider-info">
						<strong>Ollama (本地)</strong>
						<span>免费，本地运行，隐私安全</span>
					</div>
				</label>
				<label class="provider-option" class:selected={config.provider === 'libretranslate'}>
					<input
						type="radio"
						name="provider"
						value="libretranslate"
						checked={config.provider === 'libretranslate'}
						onchange={() => handleProviderChange('libretranslate')}
					/>
					<div class="provider-info">
						<strong>LibreTranslate</strong>
						<span>免费API，速度较快</span>
					</div>
				</label>
			</div>
		</div>

		{#if config.provider === 'ollama'}
			<div class="setting-row">
				<div class="ollama-status">
					<span class="status-label">Ollama {$t.status}:</span>
					{#if isChecking}
						<span class="status-checking">{$t.checking}...</span>
					{:else if ollamaStatus?.available}
						<span class="status-online">● {$t.online}</span>
						{#if ollamaStatus.models}
							<span class="models-count">({ollamaStatus.models.length} {$t.modelsAvailable})</span>
						{/if}
					{:else}
						<span class="status-offline">● {$t.offline}</span>
						{#if ollamaStatus?.error}
							<span class="error-hint">({ollamaStatus.error})</span>
						{/if}
					{/if}
					<button class="check-btn" onclick={checkStatus} disabled={isChecking}>
						{$t.checkAgain}
					</button>
				</div>

				{#if !ollamaStatus?.available}
					<div class="setup-hint">
						<p>{$t.ollamaSetupHint}</p>
						<ol>
							<li>{$t.installOllama}</li>
							<li>{$t.pullModel}: <code>ollama pull qwen2.5:3b</code></li>
							<li>{$t.startOllama}</li>
						</ol>
						<a
							href="https://ollama.com/download"
							target="_blank"
							rel="noopener noreferrer"
							class="download-link"
						>
							{$t.downloadOllama} →
						</a>
					</div>
				{/if}

				{#if ollamaStatus?.available && ollamaStatus.models && ollamaStatus.models.length > 0}
					<div class="model-select">
						<label for="model-select">{$t.selectModel}:</label>
						<select
							id="model-select"
							value={config.ollamaModel}
							onchange={(e) => handleModelChange(e.currentTarget.value)}
						>
							{#each ollamaStatus.models as model}
								<option value={model}>{model}</option>
							{/each}
						</select>
					</div>
				{/if}
			</div>
		{/if}

		{#if config.provider === 'libretranslate'}
			<div class="setting-row">
				<p class="libre-desc">{$t.libreTranslateDesc}</p>
			</div>
		{/if}
	{/if}
</div>

<style>
	.translation-settings {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.setting-row {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.toggle-text {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.setting-desc {
		margin: 0;
		font-size: 0.65rem;
		color: var(--text-muted);
	}

	.setting-title {
		margin: 0;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.provider-options {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.provider-option {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.6rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border);
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.provider-option:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.provider-option.selected {
		border-color: var(--accent);
		background: rgba(var(--accent-rgb), 0.1);
	}

	.provider-option input {
		margin-top: 0.1rem;
	}

	.provider-info {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.provider-info strong {
		font-size: 0.7rem;
		color: var(--text-primary);
	}

	.provider-info span {
		font-size: 0.6rem;
		color: var(--text-muted);
	}

	.ollama-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 4px;
		font-size: 0.7rem;
	}

	.status-label {
		color: var(--text-secondary);
	}

	.status-online {
		color: var(--accent);
	}

	.status-offline {
		color: var(--danger);
	}

	.status-checking {
		color: var(--text-muted);
	}

	.models-count {
		color: var(--text-muted);
		font-size: 0.6rem;
	}

	.error-hint {
		color: var(--danger);
		font-size: 0.6rem;
	}

	.check-btn {
		margin-left: auto;
		padding: 0.2rem 0.5rem;
		background: rgba(var(--accent-rgb), 0.1);
		border: 1px solid rgba(var(--accent-rgb), 0.3);
		border-radius: 3px;
		color: var(--accent);
		font-size: 0.6rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.check-btn:hover:not(:disabled) {
		background: rgba(var(--accent-rgb), 0.2);
	}

	.check-btn:disabled {
		opacity: 0.5;
		cursor: wait;
	}

	.setup-hint {
		padding: 0.75rem;
		background: rgba(255, 204, 0, 0.1);
		border: 1px solid rgba(255, 204, 0, 0.3);
		border-radius: 4px;
		font-size: 0.65rem;
	}

	.setup-hint p {
		margin: 0 0 0.5rem;
		color: var(--text-secondary);
	}

	.setup-hint ol {
		margin: 0 0 0.5rem;
		padding-left: 1.25rem;
		color: var(--text-muted);
	}

	.setup-hint li {
		margin-bottom: 0.25rem;
	}

	.setup-hint code {
		padding: 0.1rem 0.3rem;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 2px;
		font-family: monospace;
	}

	.download-link {
		color: var(--accent);
		text-decoration: none;
	}

	.download-link:hover {
		text-decoration: underline;
	}

	.model-select {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.7rem;
	}

	.model-select label {
		color: var(--text-secondary);
	}

	.model-select select {
		padding: 0.3rem 0.5rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid var(--border);
		border-radius: 3px;
		color: var(--text-primary);
		font-size: 0.65rem;
		cursor: pointer;
	}

	.model-select select:focus {
		outline: none;
		border-color: var(--accent);
	}

	.libre-desc {
		margin: 0;
		font-size: 0.65rem;
		color: var(--text-muted);
	}
</style>
