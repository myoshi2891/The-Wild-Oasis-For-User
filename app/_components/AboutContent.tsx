"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

interface AboutContentProps {
  cabinsCount: number;
}

export default function AboutContent({ cabinsCount }: AboutContentProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className="md:col-span-3">
        <h1 className="mb-10 text-4xl font-medium text-accent-400">
          {t.about.title1}
        </h1>

        <div className="space-y-8">
          <p>{t.about.p1_1}</p>
          <p>
            {t.about.p1_2.replaceAll("{count}", cabinsCount.toString())}
          </p>
          <p>{t.about.p1_3}</p>
        </div>
      </div>

      <div className="md:col-span-3 md:col-start-1">
        <h2 className="mb-10 text-4xl font-medium text-accent-400">
          {t.about.title2}
        </h2>

        <div className="space-y-8">
          <p>{t.about.p2_1}</p>
          <p>{t.about.p2_2}</p>

          <div>
            <Link
              href="/cabins"
              className="mt-4 inline-block bg-accent-500 px-8 py-5 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
            >
              {t.about.cta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
