
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscription', {
        body: { email },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-20 bg-blue">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-lato font-bold text-white mb-6">
          Stay Updated
        </h2>
        <p className="text-lg text-lightblue mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest updates on our environmental initiatives, 
          success stories, and ways you can make a difference in your community.
        </p>
        
        <form onSubmit={handleNewsletterSubscription} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-4 py-3 border border-lightblue rounded-lg focus:outline-none focus:ring-2 focus:ring-lightblue text-dark bg-white"
          />
          <button 
            type="submit"
            disabled={isSubscribing}
            className="bg-lightblue text-dark px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors disabled:opacity-50"
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        
        <p className="text-sm text-lightblue mt-4 opacity-80">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
