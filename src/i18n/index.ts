import fr, { type TranslationKey } from "./fr";
import en from "./en";

export type Locale = "fr" | "en";

const translations: Record<Locale, Record<TranslationKey, string>> = {
  fr,
  en,
};

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.fr[key] ?? key;
}

export type { TranslationKey };
