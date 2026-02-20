"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Renders the header for the Cabins section using localized title and description.
 *
 * @returns A header JSX element containing the localized `t.cabins.title` and `t.cabins.description`.
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