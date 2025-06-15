
import React from "react";
import BlogPostCard, { BlogPost } from "./BlogPostCard";
import { useTranslation } from "@/hooks/useTranslation";

interface BlogPostGridProps {
  posts: BlogPost[];
  resolveCategory: (post: BlogPost) => string;
  lang: string;
  formatDate: (dateString: string) => string;
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({
  posts,
  resolveCategory,
  lang,
  formatDate,
}) => {
  const { t } = useTranslation();
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p
          className="text-gray-600 dark:text-gray-400 text-lg"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {t("blog.noPosts")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          resolveCategory={resolveCategory}
          lang={lang}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default BlogPostGrid;
