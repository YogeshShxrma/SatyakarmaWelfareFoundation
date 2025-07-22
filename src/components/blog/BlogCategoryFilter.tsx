
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";

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
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={category === selectedCategory ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                  : {}
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCategoryFilter;
