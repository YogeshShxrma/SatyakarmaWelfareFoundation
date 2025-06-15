
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
    <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                category === selectedCategory
                  ? "bg-green-600 dark:bg-green-700 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-800 hover:text-green-600 dark:hover:text-green-400"
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
