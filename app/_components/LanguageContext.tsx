"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import { translations, Language } from "../_lib/translations";

type LanguageContextType = {
  language: Language;
  t: typeof translations[Language];
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Checks whether a string represents a supported language code ("en" or "ja").
 *
 * @param lang - The value to check; may be `null`.
 * @returns `true` if `lang` is `"en"` or `"ja"`, `false` otherwise. Narrows the type to `Language` when `true`.
 */
function isValidLanguage(lang: string | null): lang is Language {
  return lang === "en" || lang === "ja";
}

/**
 * Provides language state, the current translation dictionary, and a toggle function to descendant components.
 *
 * On mount it reads the saved language from localStorage (key "app-language"), validates it, updates
 * document.documentElement.lang, and persists subsequent changes. During server rendering (and before
 * mount) the provider defaults to `"en"` to avoid hydration mismatch, then switches to the saved or selected
 * language after mounting.
 *
 * @returns The React context provider that supplies `{ language, t, toggleLanguage }` to descendants.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Client-side only: check local storage for saved language preference
    const rawLang = localStorage.getItem("app-language");
    if (isValidLanguage(rawLang)) {
      setLanguage(rawLang);
      document.documentElement.lang = rawLang;
    } else {
      document.documentElement.lang = "en";
    }
    setMounted(true);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => {
      const nextLang = prevLang === "en" ? "ja" : "en";
      localStorage.setItem("app-language", nextLang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = nextLang;
      }
      return nextLang;
    });
  }, []);

  // Prevent hydration mismatch by returning empty/default on server, 
  // but for SEO it's better to just render the default language until mounted.
  // We'll render default 'en' during SSR, and swap if needed on mount.
  
  const value = useMemo(() => ({
    language: mounted ? language : "en",
    t: mounted ? translations[language] : translations["en"],
    toggleLanguage,
  }), [mounted, language, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Access the app's current language context.
 *
 * @returns The LanguageContext value: `{ language, t, toggleLanguage }`.
 * @throws If called outside of a `LanguageProvider`.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}