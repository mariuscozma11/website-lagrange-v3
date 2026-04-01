// Server-side language utilities for SEO optimization
export const supportedLanguages = ["en", "ro"] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return supportedLanguages.includes(lang as SupportedLanguage);
}

export function getDefaultLanguage(): SupportedLanguage {
  return "ro";
}

export function getSafeLanguage(lang: string): SupportedLanguage {
  return isValidLanguage(lang) ? lang : getDefaultLanguage();
}