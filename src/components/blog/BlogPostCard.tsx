
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  resolveCategory: (post: BlogPost) => string;
  lang: string;
  formatDate: (dateString: string) => string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  resolveCategory,
  lang,
  formatDate,
}) => {
  const { t } = useTranslation();
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2">
      {post.image_url && (
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image_url})` }}
        ></div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            {resolveCategory(post)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">5 {t("blog.minRead")}</span>
        </div>
        <h2
          className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 leading-tight"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {post.title}
        </h2>
        <p
          className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(post.created_at)}
          </span>
          <button
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-300"
            style={
              lang === "hi"
                ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                : {}
            }
          >
            {t("blog.readMore")}
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
