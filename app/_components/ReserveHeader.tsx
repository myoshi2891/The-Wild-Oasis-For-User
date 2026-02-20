"use client";

import { useLanguage } from "./LanguageContext";

export default function ReserveHeader({ name }: { name: string }) {
  const { t } = useLanguage();

  return (
    <h2 className="text-center text-3xl font-semibold text-accent-400 sm:text-4xl md:text-5xl">
      {t.cabinDetails.reserveHeading.replace("{name}", name)}
    </h2>
  );
}
