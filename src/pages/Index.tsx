
import Hero from "@/components/Hero";
import ImpactSection from "@/components/ImpactSection";
import MissionOverview from "@/components/MissionOverview";
import CampaignSection from "@/components/CampaignSection";
import HowYouCanHelpSection from "@/components/HowYouCanHelpSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import CallToAction from "@/components/CallToAction";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingVolunteerButton from "@/components/FloatingVolunteerButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ImpactSection />
      <MissionOverview />
      <CampaignSection />
      <HowYouCanHelpSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CallToAction />
      <Footer />
      <FloatingVolunteerButton />
    </div>
  );
};

export default Index;
