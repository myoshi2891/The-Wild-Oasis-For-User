"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Renders a button that toggles the application's current language via the language context.
 *
 * @returns The button element displaying the localized toggle label. 
 */
export default function LanguageToggle() {
  const { t, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center rounded-md border border-primary-700 px-3 py-1.5 text-sm font-semibold text-primary-200 transition-colors hover:border-accent-400 hover:text-accent-400"
      aria-label="Toggle Language"
    >
      {t.common.toggleLang}
    </button>
  );
}