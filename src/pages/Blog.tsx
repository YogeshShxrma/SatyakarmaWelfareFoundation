import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import BlogHero from "@/components/blog/BlogHero";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import NewsletterSignup from "@/components/blog/NewsletterSignup";

import type { BlogPost } from "@/components/blog/BlogPostCard";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
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
      console.error("Error fetching blog posts:", error);
      setError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  // Helper to resolve category for display purposes
  const resolveCategory = (post: BlogPost) => {
    if (post.category.toLowerCase() === "tree")
      return t("focusAreas.tree.title");
    if (post.category.toLowerCase() === "children")
      return t("focusAreas.children.title");
    if (post.category.toLowerCase() === "plastic")
      return t("focusAreas.plastic.title");
    if (post.category.toLowerCase() === "community")
      return t("focusAreas.community.title");
    return post.category;
  };

  const filteredPosts =
    selectedCategory === t("blog.categoryAll")
      ? blogPosts
      : blogPosts.filter((post) => resolveCategory(post) === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      lang === "hi" ? "hi-IN" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
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
          />
        </div>
      </section>
      <NewsletterSignup
        email={email}
        setEmail={setEmail}
        isSubscribing={isSubscribing}
        setIsSubscribing={setIsSubscribing}
      />
      <Footer />
    </div>
  );
};

export default Blog;
