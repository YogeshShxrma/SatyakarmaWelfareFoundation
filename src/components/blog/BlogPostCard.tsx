
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import ShareButton from "@/components/ui/ShareButton";

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
  onReadMore: (post: BlogPost) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  resolveCategory,
  lang,
  formatDate,
  onReadMore,
}) => {
  const { t } = useTranslation();

  const handleReadMore = () => {
    onReadMore(post);
  };

  
  return (
    <article className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer group"
             onClick={handleReadMore}>
      {post.image_url && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const container = target.parentElement;
              if (container) {
                container.style.display = 'none';
              }
            }}
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-sage-600 font-medium px-2 py-1 bg-sage-100 rounded-full">
            {resolveCategory(post)}
          </span>
          <span className="text-sm text-muted-foreground">5 {t("blog.minRead")}</span>
        </div>
        <h2
          className="text-xl font-semibold text-card-foreground mb-3 leading-tight group-hover:text-sage-700 transition-colors"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {post.title}
        </h2>
        <div
          className="text-muted-foreground mb-4 leading-relaxed"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          <p>{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            {formatDate(post.created_at)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReadMore();
            }}
            className="text-sage-600 hover:text-sage-700 font-medium transition-colors group-hover:text-sage-500"
            style={
              lang === "hi"
                ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                : {}
            }
          >
            {t("blog.readMore")}
          </button>
        </div>
        
        {/* Share Button */}
        <div className="flex justify-end pt-2 border-t border-border">
          <div onClick={(e) => e.stopPropagation()}>
            <ShareButton
              title={post.title}
              excerpt={post.excerpt}
              url={`${window.location.origin}/blog#${post.id}`}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
