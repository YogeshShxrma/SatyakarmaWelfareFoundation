
import en from "@/translations/en.json";
import hi from "@/translations/hi.json";
import { useTranslationContext } from "@/context/TranslationContext";

type KeyPath = string;

function get(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export function useTranslation() {
  const { lang } = useTranslationContext();
  const dict = lang === "hi" ? hi : en;

  function t(key: KeyPath): string {
    return get(dict, key) || key;
  }

  return { t, lang };
}
