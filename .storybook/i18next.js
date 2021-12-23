import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initCfg } from '../src/i18n';

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({ ...initCfg });

  initCfg.supportedLngs.forEach((lang) => {
    initCfg.ns.forEach((n) => {
      i18n.addResourceBundle(
        lang,
        n,
        require(`../public/locales/${lang}/${n}.json`),
      );
    });
  });
}

export { i18n };
