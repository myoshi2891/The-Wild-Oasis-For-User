"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import { translations, Language } from "../_lib/translations";

type LanguageContextType = {
  language: Language;
  t: typeof translations[Language];
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LANGUAGES = Object.keys(translations) as Language[];

function isValidLanguage(lang: string | null): lang is Language {
  return lang !== null && SUPPORTED_LANGUAGES.includes(lang as Language);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // 初期ロード: localStorage から保存済み言語設定を復元
  useEffect(() => {
    const rawLang = localStorage.getItem("app-language");
    if (isValidLanguage(rawLang)) {
      setLanguage(rawLang);
    }
    setMounted(true);
  }, []);

  // 言語変更の副作用: localStorage 保存と html lang 属性の更新
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("app-language", language);
    document.documentElement.lang = language;
  }, [language, mounted]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => (prevLang === "en" ? "ja" : "en"));
  }, []);

  // Hydration ミスマッチ防止: SSR 時はデフォルト言語を返す
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
