
import { useEffect } from "react";
import Hero from "@/components/Hero";
import ImpactSection from "@/components/ImpactSection";
import StoriesSection from "@/components/StoriesSection";
import AboutSection from "@/components/AboutSection";
import HowYouCanHelpSection from "@/components/HowYouCanHelpSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import CallToAction from "@/components/CallToAction";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingVolunteerButton from "@/components/FloatingVolunteerButton";

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.scroll-reveal');
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ImpactSection />
      <StoriesSection />
      <AboutSection />
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
