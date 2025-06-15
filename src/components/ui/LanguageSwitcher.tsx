
import React from "react";
import { useTranslationContext } from "@/context/TranslationContext";
import { Switch } from "./switch";

const LanguageSwitcher = () => {
  const { lang, setLang } = useTranslationContext();

  // Toggle language on switch
  const handleToggle = () => {
    setLang(lang === "en" ? "hi" : "en");
  };

  return (
    <div className="flex items-center space-x-2 select-none">
      {/* English label */}
      <span
        className={
          "px-1 text-sm font-medium transition-colors" +
          (lang === "en"
            ? " text-green-700 font-semibold"
            : " text-gray-500")
        }
      >
        EN
      </span>
      {/* Switch control */}
      <Switch
        checked={lang === "hi"}
        onCheckedChange={handleToggle}
        aria-label={
          lang === "en" ? "Switch to Hindi" : "Switch to English"
        }
        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
      />
      {/* Hindi label */}
      <span
        className={
          "px-1 text-sm font-medium font-devanagari transition-colors"
          +
          (lang === "hi"
            ? " text-green-700 font-semibold"
            : " text-gray-500")
        }
        style={{ fontFamily: `'Noto Sans Devanagari', Arial, sans-serif` }}
      >
        हिंदी
      </span>
    </div>
  );
};

export default LanguageSwitcher;

