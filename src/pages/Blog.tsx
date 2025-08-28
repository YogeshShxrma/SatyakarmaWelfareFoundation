
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import BlogHero from "@/components/blog/BlogHero";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import BlogPostModal from "@/components/blog/BlogPostModal";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import type { BlogPost } from "@/components/blog/BlogPostCard";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, lang } = useTranslation();

  const categories = [
    t("blog.categoryAll"),
    t("focusAreas.tree.title"),
    t("focusAreas.children.title"),
    t("focusAreas.plastic.title"),
    t("focusAreas.community.title"),
  ];

  useEffect(() => {
    fetchBlogPosts();
    // eslint-disable-next-line
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      setError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const resolveCategory = (post: BlogPost) => {
    switch (post.category.toLowerCase()) {
      case "environmental":
        return t("focusAreas.tree.title"); // Map Environmental to Tree Plantation
      case "children's health":
        return t("focusAreas.children.title"); // Map Children's Health to Children's Physical Health
      default:
        return post.category; // Return as-is for any other categories
    }
  };

  const filteredPosts =
    selectedCategory === t("blog.categoryAll")
      ? blogPosts
      : blogPosts.filter((post) => resolveCategory(post) === selectedCategory);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(
      lang === "hi" ? "hi-IN" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

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
      <BlogHero />
      <BlogCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogPostGrid
            posts={filteredPosts}
            resolveCategory={resolveCategory}
            lang={lang}
            formatDate={formatDate}
            onReadMore={handleReadMore}
          />
        </div>
      </section>
      
      {/* Blog Post Modal */}
      <BlogPostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        resolveCategory={resolveCategory}
        lang={lang}
        formatDate={formatDate}
      />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Blog;

