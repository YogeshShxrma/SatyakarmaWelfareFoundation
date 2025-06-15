
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterSignupProps {
  email: string;
  setEmail: (email: string) => void;
  isSubscribing: boolean;
  setIsSubscribing: (value: boolean) => void;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  email,
  setEmail,
  isSubscribing,
  setIsSubscribing,
}) => {
  const { toast } = useToast();
  const { t, lang } = useTranslation();

  const handleNewsletterSubscription = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const { error } = await supabase.functions.invoke(
        "newsletter-subscription",
        {
          body: { email },
        }
      );

      if (error) throw error;

      toast({
        title: t("newsletter.success"),
        description: "",
      });
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: t("newsletter.error"),
        description: "",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {t("newsletter.title")}
        </h2>
        <p
          className="text-lg text-gray-600 mb-8"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {t("newsletter.desc")}
        </p>
        <form
          onSubmit={handleNewsletterSubscription}
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.emailPlaceholder")}
            required
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            style={
              lang === "hi"
                ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                : {}
            }
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
  );
};

export default NewsletterSignup;
