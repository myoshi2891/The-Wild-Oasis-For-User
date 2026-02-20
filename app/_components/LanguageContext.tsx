"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import { translations, Language } from "../_lib/translations";

type LanguageContextType = {
  language: Language;
  t: typeof translations[Language];
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function isValidLanguage(lang: string | null): lang is Language {
  return lang === "en" || lang === "ja";
}

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

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
