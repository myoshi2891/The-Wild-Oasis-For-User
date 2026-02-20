"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Renders a button that toggles the application's UI language when clicked.
 *
 * The button label is obtained from the current translations and includes an accessible
 * `aria-label` of "Toggle Language".
 *
 * @returns The language toggle button element.
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