/**
 * Language store - manages application language state
 */

import { writable, derived } from 'svelte/store';
import type { Language, Translations } from '$lib/config/i18n';
import { getLanguage, setLanguage, translations, t as translate } from '$lib/config/i18n';

// Create the language store
function createLanguageStore() {
	const { subscribe, set, update } = writable<Language>(getLanguage());

	return {
		subscribe,
		set: (lang: Language) => {
			setLanguage(lang);
			set(lang);
		},
		toggle: () => {
			update((current) => {
				const newLang: Language = current === 'en' ? 'zh' : 'en';
				setLanguage(newLang);
				return newLang;
			});
		}
	};
}

export const language = createLanguageStore();

// Derived store for current translations
export const t = derived<typeof language, Translations>(language, ($lang) => {
	return translations[$lang];
});

// Helper function to get translated text by key
export function translateKey(key: string): string {
	const keys = key.split('.');
	let value: unknown = translations[getLanguage()];

	for (const k of keys) {
		if (value && typeof value === 'object' && k in value) {
			value = (value as Record<string, unknown>)[k];
		} else {
			return key;
		}
	}

	return typeof value === 'string' ? value : key;
}

// Derived store for language display name
export const languageDisplayName = derived(language, ($lang) =>
	$lang === 'en' ? 'English' : '中文'
);

// Re-export translation utilities
export { getPanelName, getPresetName, getPresetDescription } from '$lib/config/i18n';
export { translate };
