import React from "react";
import { ExternalLink } from "lucide-react";
import type { BlogPost } from "./BlogPostCard";

interface BlogSocialPreviewProps {
  post: BlogPost;
  platform?: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp';
}

const BlogSocialPreview: React.FC<BlogSocialPreviewProps> = ({ 
  post, 
  platform = 'facebook' 
}) => {
  const shareUrl = `${window.location.origin}/blog#${post.id}`;
  
  const platformStyles = {
    facebook: {
      container: "border border-gray-300 rounded-lg bg-white",
      image: "h-64",
      content: "p-3",
      title: "text-lg font-semibold text-gray-900 hover:text-blue-600",
      description: "text-sm text-gray-600 mt-1",
      url: "text-xs text-gray-500 uppercase mt-2"
    },
    twitter: {
      container: "border border-gray-300 rounded-2xl bg-white",
      image: "h-48",
      content: "p-3",
      title: "text-base font-semibold text-gray-900",
      description: "text-sm text-gray-600 mt-1",
      url: "text-sm text-gray-500 mt-2"
    },
    linkedin: {
      container: "border border-gray-300 rounded-lg bg-white",
      image: "h-56",
      content: "p-3",
      title: "text-lg font-semibold text-gray-900 hover:text-blue-700",
      description: "text-sm text-gray-600 mt-1",
      url: "text-xs text-gray-500 mt-2"
    },
    whatsapp: {
      container: "border border-gray-300 rounded-lg bg-white",
      image: "h-48",
      content: "p-3",
      title: "text-base font-semibold text-gray-900",
      description: "text-sm text-gray-600 mt-1",
      url: "text-sm text-gray-500 mt-2"
    }
  };

  const styles = platformStyles[platform];

  return (
    <div className="max-w-md mx-auto">
      <div className={`${styles.container} shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
        {post.image_url && (
          <div className={`${styles.image} overflow-hidden ${platform === 'facebook' || platform === 'linkedin' ? 'rounded-t-lg' : platform === 'twitter' ? 'rounded-t-2xl' : 'rounded-t-lg'}`}>
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
        <div className={styles.content}>
          <h3 className={styles.title}>
            {post.title}
          </h3>
          <p className={styles.description}>
            {post.excerpt}
          </p>
          <div className={`${styles.url} flex items-center gap-1`}>
            <ExternalLink className="w-3 h-3" />
            <span>satyakarmafoundation.org</span>
          </div>
        </div>
      </div>
      
      {/* Platform label */}
      <div className="text-center mt-2">
        <span className="text-xs text-gray-500 capitalize font-medium">
          {platform} Preview
        </span>
      </div>
    </div>
  );
};

export default BlogSocialPreview;