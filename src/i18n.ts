import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { capitalize } from './utils/formatting';

export const initCfg = {
  ns: [
    'common',
    'walletCreateRestore',
    'walletReceiveTab',
    'walletView',
    'walletsList',
  ],
  defaultNS: 'common',
  fallbackLng: 'en',
  supportedLngs: ['en'],
  // TODO: conditionally enable
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
    format(v: any, format?: string, lng?: string): string {
      if (format === 'lowercase') {
        return v.toLowerCase();
      }

      if (format === 'capitalize') {
        return capitalize(v);
      }

      return v;
    },
  },
};

export const initI18n = () => {
  return (
    i18n
      // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init(initCfg)
  );
};
