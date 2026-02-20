"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Renders a styled heading for a cabin reservation with the given guest name inserted into the localized template.
 *
 * @param name - Value inserted in place of the "{name}" placeholder in the localized reserve heading
 * @returns The h2 element containing the localized reserve heading with the provided name
 */
export default function ReserveHeader({ name }: { name: string }) {
  const { t } = useLanguage();

  return (
    <h2 className="text-center text-3xl font-semibold text-accent-400 sm:text-4xl md:text-5xl">
      {t.cabinDetails.reserveHeading.replace("{name}", name)}
    </h2>
  );
}