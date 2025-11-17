import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import deCommon from './locales/de/common.json';
import ptCommon from './locales/pt/common.json';
import frCommon from './locales/fr/common.json';
import itCommon from './locales/it/common.json';
import plCommon from './locales/pl/common.json';
import zhCommon from './locales/zh/common.json';

export interface SupportedLanguage {
  code: string;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
];

interface TranslationResources {
  [key: string]: {
    translation: typeof enCommon;
  };
}

const resources: TranslationResources = {
  en: { translation: enCommon },
  es: { translation: esCommon },
  de: { translation: deCommon },
  pt: { translation: ptCommon },
  fr: { translation: frCommon },
  it: { translation: itCommon },
  pl: { translation: plCommon },
  zh: { translation: zhCommon },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'aoe2_language',
    },
  });

export default i18n;
