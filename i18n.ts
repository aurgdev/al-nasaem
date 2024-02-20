import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n/en.json";
import ar from "./i18n/ar.json";
const { languageDetectorPlugin } = require("./utils/languageDetectorPlugin");

//empty for now
const resources = { en, ar };

export const availableLanguages = Object.keys(resources);

i18n
    .use(initReactI18next)
    .use(languageDetectorPlugin)
    .init({
        resources,
        compatibilityJSON: "v3",
        defaultNS: "common",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // not needed for react!!
        },
    });
