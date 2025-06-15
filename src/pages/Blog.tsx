import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();
  const { t, lang } = useTranslation();

  // Categories in both languages (these are the only ones that can be translated)
  const categories = [
    t("blog.categoryAll"),
    t("focusAreas.tree.title"),
    t("focusAreas.children.title"),
    t("focusAreas.plastic.title"),
    t("focusAreas.community.title")
  ];

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const { error } = await supabase.functions.invoke('newsletter-subscription', {
        body: { email },
      });

      if (error) throw error;

      toast({
        title: t("newsletter.success"),
        description: "",
      });
      setEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: t("newsletter.error"),
        description: "",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  // Helper to resolve category for display purposes
  const resolveCategory = (post: BlogPost) => {
    // Show translated (UI) label for the blog's category value
    // Map DB 'category' to translation key:
    // For example, if post.category === 'Plastic', get t('focusAreas.plastic.title')
    if (post.category.toLowerCase() === "tree") return t("focusAreas.tree.title");
    if (post.category.toLowerCase() === "children") return t("focusAreas.children.title");
    if (post.category.toLowerCase() === "plastic") return t("focusAreas.plastic.title");
    if (post.category.toLowerCase() === "community") return t("focusAreas.community.title");
    return post.category; // fallback
  };

  // Filtering by selected UI-translated category:
  const filteredPosts =
    selectedCategory === t("blog.categoryAll")
      ? blogPosts
      : blogPosts.filter(post => resolveCategory(post) === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">{t("actions.sending")}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t("blog.title")}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
            {t("blog.desc")}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === selectedCategory
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600"
                }`}
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                {t("blog.noPosts")}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2">
                  {post.image_url && (
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.image_url})` }}></div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-green-600 font-medium">
                        {resolveCategory(post)}
                      </span>
                      <span className="text-sm text-gray-500">
                        5 {t("blog.minRead")}
                      </span>
                    </div>
                    {/* Since blog title/excerpt/content are not localized, use the same for both languages */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 leading-tight"
                        style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed"
                        style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{formatDate(post.created_at)}</span>
                      <button className="text-green-600 hover:text-green-700 font-medium" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                        {t("blog.readMore")}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("newsletter.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-8" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
            {t("newsletter.desc")}
          </p>
          <form onSubmit={handleNewsletterSubscription} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.emailPlaceholder")}
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSubscribing ? t("actions.subscribing") : t("actions.subscribe")}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Blog;
