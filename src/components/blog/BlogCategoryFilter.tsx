
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface BlogCategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const BlogCategoryFilter: React.FC<BlogCategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { lang } = useTranslation();
  return (
    <section className="py-8 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === selectedCategory
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600"
              }`}
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                  : {}
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCategoryFilter;
