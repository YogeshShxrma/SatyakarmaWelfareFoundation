import { useEffect } from 'react';

interface DynamicMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const DynamicMeta: React.FC<DynamicMetaProps> = ({
  title = "Satyakarma Welfare Foundation",
  description = "Working towards a better future through environmental protection, children's health, and community development.",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = window.location.href
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const selector = isName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        if (isName) {
          tag.setAttribute('name', property);
        } else {
          tag.setAttribute('property', property);
        }
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Update Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', 'article');

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);

    // Update standard meta tags
    updateMetaTag('description', description, true);

    // Cleanup function to reset to default values when component unmounts
    return () => {
      updateMetaTag('og:title', "Satyakarma Welfare Foundation");
      updateMetaTag('og:description', "Working towards a better future through environmental protection, children's health, and community development.");
      updateMetaTag('og:image', "https://lovable.dev/opengraph-image-p98pqg.png");
      updateMetaTag('og:url', window.location.origin);
      updateMetaTag('og:type', 'website');
      
      updateMetaTag('twitter:title', "Satyakarma Welfare Foundation", true);
      updateMetaTag('twitter:description', "Working towards a better future through environmental protection, children's health, and community development.", true);
      updateMetaTag('twitter:image', "https://lovable.dev/opengraph-image-p98pqg.png", true);
      
      updateMetaTag('description', "Working towards a better future through environmental protection, children's health, and community development.", true);
      
      document.title = "Satyakarma Welfare Foundation";
    };
  }, [title, description, image, url]);

  return null; // This component doesn't render anything
};

export default DynamicMeta;