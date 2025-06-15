
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

const BlogHero = () => {
  const { t, lang } = useTranslation();
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {t("blog.title")}
        </h1>
        <p
          className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {t("blog.desc")}
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
