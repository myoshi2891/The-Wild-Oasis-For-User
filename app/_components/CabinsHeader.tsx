"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Render the cabins section header using the current language.
 *
 * @returns A header element that displays the localized cabins title and description.
 */
export default function CabinsHeader() {
  const { t } = useLanguage();

  return (
    <header className="space-y-4 sm:space-y-5">
      <h1 className="text-3xl font-medium text-accent-400 sm:text-4xl md:text-5xl">
        {t.cabins.title}
      </h1>
      <p className="text-base leading-relaxed text-primary-200 sm:text-lg sm:leading-relaxed md:max-w-3xl">
        {t.cabins.description}
      </p>
    </header>
  );
}