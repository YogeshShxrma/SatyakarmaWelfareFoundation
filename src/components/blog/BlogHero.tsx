
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

const BlogHero = () => {
  const { t, lang } = useTranslation();
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          {t("blog.title")}
        </h1>
        <p
          className="text-xl text-gray-600 leading-relaxed"
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
