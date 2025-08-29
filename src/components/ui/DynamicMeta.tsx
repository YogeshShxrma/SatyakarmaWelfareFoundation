import { useEffect } from 'react';

interface DynamicMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'article' | 'website';
  publishedDate?: string;
  author?: string;
}

const DynamicMeta: React.FC<DynamicMetaProps> = ({
  title = "Satyakarma Welfare Foundation",
  description = "Working towards a better future through environmental protection, children's health, and community development.",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = window.location.href,
  type = 'website',
  publishedDate,
  author = 'Satyakarma Welfare Foundation'
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
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'Satyakarma Welfare Foundation');
    updateMetaTag('og:locale', 'en_US');
    
    if (type === 'article' && publishedDate) {
      updateMetaTag('og:article:published_time', publishedDate);
      updateMetaTag('og:article:author', author);
      updateMetaTag('og:article:section', 'Blog');
    }

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:site', '@SatyakarmaFoundation', true);
    updateMetaTag('twitter:creator', '@SatyakarmaFoundation', true);

    // Update LinkedIn specific tags
    updateMetaTag('linkedin:title', title);
    updateMetaTag('linkedin:description', description);
    updateMetaTag('linkedin:image', image);

    // Update WhatsApp/Telegram specific tags (use Open Graph)
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:image:alt', title);

    // Update standard meta tags
    updateMetaTag('description', description, true);
    updateMetaTag('keywords', 'satyakarma, welfare, foundation, environment, children, community development, NGO', true);
    
    if (type === 'article') {
      updateMetaTag('article:author', author, true);
      if (publishedDate) {
        updateMetaTag('article:published_time', publishedDate, true);
      }
    }

    // Add JSON-LD structured data for better SEO
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = type === 'article' ? {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image,
      "url": url,
      "datePublished": publishedDate,
      "author": {
        "@type": "Organization",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Satyakarma Welfare Foundation",
        "logo": {
          "@type": "ImageObject",
          "url": "https://lovable.dev/opengraph-image-p98pqg.png"
        }
      }
    } : {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": title,
      "description": description,
      "url": url
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

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