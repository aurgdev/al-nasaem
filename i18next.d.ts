import "react-i18next";
import en from "./i18n/en.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: typeof en;
  }
}
