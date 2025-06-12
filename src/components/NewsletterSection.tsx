
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Error",
        description: "Please fill in both name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscription', {
        body: { email, name },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
      setName("");
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
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-primary-foreground mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates on environmental initiatives, 
            success stories, and ways you can make a difference in your community.
          </p>
          
          <form onSubmit={handleNewsletterSubscription} className="max-w-lg mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="flex-1 px-4 py-3 border border-primary-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-foreground text-primary-foreground bg-primary-foreground/10 placeholder-primary-foreground/60"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 border border-primary-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-foreground text-primary-foreground bg-primary-foreground/10 placeholder-primary-foreground/60"
              />
            </div>
            <button 
              type="submit"
              disabled={isSubscribing}
              className="w-full sm:w-auto bg-primary-foreground text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary-foreground/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          
          <p className="text-sm text-primary-foreground/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
