"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Language } from "../_lib/translations";

type LanguageContextType = {
  language: Language;
  t: typeof translations[Language];
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Client-side only: check local storage for saved language preference
    const savedLang = localStorage.getItem("app-language") as Language;
    if (savedLang === "en" || savedLang === "ja") {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ja" : "en";
    setLanguage(nextLang);
    localStorage.setItem("app-language", nextLang);
  };

  // Prevent hydration mismatch by returning empty/default on server, 
  // but for SEO it's better to just render the default language until mounted.
  // We'll render default 'en' during SSR, and swap if needed on mount.
  
  const value = {
    language: mounted ? language : "en",
    t: mounted ? translations[language] : translations["en"],
    toggleLanguage,
  };

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
