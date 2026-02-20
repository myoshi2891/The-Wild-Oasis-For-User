"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Render a localized reservation heading, inserting the provided name into the translation.
 *
 * @param name - The guest or cabin name used to replace the `{name}` placeholder in the localized `reserveHeading`
 * @returns A heading element containing the localized reservation text with `{name}` replaced by `name`
 */
export default function ReserveHeader({ name }: { name: string }) {
  const { t } = useLanguage();

  return (
    <h2 className="text-center text-3xl font-semibold text-accent-400 sm:text-4xl md:text-5xl">
      {t.cabinDetails.reserveHeading.replace("{name}", name)}
    </h2>
  );
}