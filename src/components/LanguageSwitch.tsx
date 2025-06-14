
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/LanguageContext";

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  // on = hindi, off = english
  return (
    <div className="flex items-center gap-2 px-2">
      <span className={`font-medium text-xs ${language === "en" ? "text-green-700" : "text-gray-400"}`}>EN</span>
      <Switch
        checked={language === "hi"}
        onCheckedChange={(val) => setLanguage(val ? "hi" : "en")}
        aria-label="Switch language: English/Hindi"
      />
      <span className={`font-medium text-xs ${language === "hi" ? "text-green-700" : "text-gray-400"}`}>हिंदी</span>
    </div>
  );
};

export default LanguageSwitch;
