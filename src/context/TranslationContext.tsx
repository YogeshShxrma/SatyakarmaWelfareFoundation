
import React, { createContext, useContext, useEffect, useReducer } from "react";

type Language = "en" | "hi";
type TranslationState = { lang: Language; };
type Action = { type: "SET_LANG"; lang: Language; };
type TranslationContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

function reducer(state: TranslationState, action: Action): TranslationState {
  switch (action.type) {
    case "SET_LANG":
      return { ...state, lang: action.lang };
    default:
      return state;
  }
}

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    lang: (localStorage.getItem("lang") as Language) || "en",
  });

  useEffect(() => {
    localStorage.setItem("lang", state.lang);
  }, [state.lang]);

  const setLang = (lang: Language) => dispatch({ type: "SET_LANG", lang });

  return (
    <TranslationContext.Provider value={{ lang: state.lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
};

export function useTranslationContext() {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error("useTranslationContext must be used within TranslationProvider");
  return ctx;
}
