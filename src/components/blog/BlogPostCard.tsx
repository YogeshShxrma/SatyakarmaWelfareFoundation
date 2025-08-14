
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import ShareButton from "@/components/ui/ShareButton";
import DynamicMeta from "@/components/ui/DynamicMeta";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Update meta tags when post is expanded (viewed)
  useEffect(() => {
    if (isExpanded) {
      // This will update the meta tags for better sharing
      const metaEvent = new CustomEvent('updateBlogMeta', {
        detail: {
          title: post.title,
          description: post.excerpt,
          image: post.image_url || "https://lovable.dev/opengraph-image-p98pqg.png",
          url: `${window.location.origin}/blog#${post.id}`
        }
      });
      window.dispatchEvent(metaEvent);
    }
  }, [isExpanded, post]);
  
  return (
    <>
      {isExpanded && (
        <DynamicMeta
          title={post.title}
          description={post.excerpt}
          image={post.image_url || "https://lovable.dev/opengraph-image-p98pqg.png"}
          url={`${window.location.origin}/blog#${post.id}`}
        />
      )}
      <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2">
      {post.image_url && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide the image container if the image fails to load
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
          <span className="text-sm text-green-600 font-medium">
            {resolveCategory(post)}
          </span>
          <span className="text-sm text-gray-500">5 {t("blog.minRead")}</span>
        </div>
        <h2
          className="text-xl font-semibold text-gray-800 mb-3 leading-tight"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {post.title}
        </h2>
        <div
          className="text-gray-600 mb-4 leading-relaxed"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {isExpanded ? (
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {formatDate(post.created_at)}
          </span>
          <button
            onClick={handleReadMore}
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
            style={
              lang === "hi"
                ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                : {}
            }
          >
            {isExpanded ? "Show Less ←" : t("blog.readMore")}
          </button>
        </div>
        
        {/* Share Button */}
        <div className="flex justify-end pt-2 border-t border-gray-100">
          <ShareButton
            title={post.title}
            excerpt={post.excerpt}
            url={`${window.location.origin}/blog#${post.id}`}
          />
        </div>
      </div>
    </article>
    </>
  );
};

export default BlogPostCard;
