import { I18n } from 'i18n';
import path from 'path';

const i18n = new I18n({
	locales: ['en', 'de', 'ru', 'pt', 'nl', 'fr', 'it', 'es', 'pl', 'uk', 'zh-cn'],
	defaultLocale: 'en',
	directory: path.join('../../admin/src', 'i18n'),
});

export const setLocale = (locale: string): void => {
	i18n.setLocale(locale);
};

export const translation = (key: string, replace?: any): string => {
	return i18n.__(key, replace ?? '');
};
