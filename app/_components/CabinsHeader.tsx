"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Header for the cabins section that displays the localized title and description.
 *
 * @returns A header element containing the cabins title and description from the current language.
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