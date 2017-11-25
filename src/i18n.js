import i18n from "i18next";
import LanguageDetecter from "i18next-browser-languagedetector";

const resources = {};

const req = require.context("./locales", true, /\.json$/);
req.keys().forEach(file => {
  const [language, namespace] = /^\.\/([\w-]+)\/([\w-]+)\.json$/
    .exec(file)
    .slice(1);
  resources[language] = resources[language] || {};
  resources[language][namespace] = req(file);
});

i18n.use(LanguageDetecter).init({
  debug: process.env.NODE_ENV !== "production",

  fallbackLng: {
    default: ["en"],
    "zh-CN": ["zh-Hans", "en"],
    "zh-HK": ["zh-Hant", "en"],
    "zh-TW": ["zh-Hant", "en"],
  },

  interpolation: {
    escapeValue: false,
  },

  resources,
});

export default i18n;
