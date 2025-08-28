import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ui/ShareButton";
import DynamicMeta from "@/components/ui/DynamicMeta";
import type { BlogPost } from "./BlogPostCard";

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  resolveCategory: (post: BlogPost) => string;
  lang: string;
  formatDate: (dateString: string) => string;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  isOpen,
  onClose,
  resolveCategory,
  lang,
  formatDate,
}) => {
  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  return (
    <>
      <DynamicMeta
        title={post.title}
        description={post.excerpt}
        image={post.image_url || "https://lovable.dev/opengraph-image-p98pqg.png"}
        url={`${window.location.origin}/blog#${post.id}`}
      />
      
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      >
        {/* Modal content */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <div 
            className="bg-background rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-sage-100 text-sage-700 text-sm font-medium rounded-full">
                  {resolveCategory(post)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(post.created_at)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-muted rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Featured image */}
              {post.image_url && (
                <div className="h-64 md:h-80 overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
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

              {/* Article content */}
              <div className="p-6">
                <h1
                  className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight"
                  style={
                    lang === "hi"
                      ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                      : {}
                  }
                >
                  {post.title}
                </h1>

                <p 
                  className="text-lg text-muted-foreground mb-6 leading-relaxed"
                  style={
                    lang === "hi"
                      ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                      : {}
                  }
                >
                  {post.excerpt}
                </p>

                <div
                  className="prose prose-lg max-w-none text-foreground leading-relaxed"
                  style={
                    lang === "hi"
                      ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                      : {}
                  }
                  dangerouslySetInnerHTML={{ 
                    __html: post.content.replace(/\n/g, '<br>') 
                  }}
                />
              </div>
            </div>

            {/* Footer with share button */}
            <div className="border-t border-border p-6 bg-muted/30">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  5 min read
                </span>
                <ShareButton
                  title={post.title}
                  excerpt={post.excerpt}
                  url={`${window.location.origin}/blog#${post.id}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostModal;