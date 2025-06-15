
import React from "react";
import { useTranslationContext } from "@/context/TranslationContext";

const LanguageSwitcher = () => {
  const { lang, setLang } = useTranslationContext();

  return (
    <div className="flex items-center space-x-2">
      <button
        aria-label="English"
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded ${lang === "en" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
      >
        EN
      </button>
      <button
        aria-label="Hindi"
        onClick={() => setLang("hi")}
        className={`px-2 py-1 rounded font-devanagari ${lang === "hi" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
        style={{ fontFamily: `'Noto Sans Devanagari', 'Arial', sans-serif` }}
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
