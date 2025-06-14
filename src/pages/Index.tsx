
import MissionOverview from "@/components/MissionOverview";
import FocusAreas from "@/components/FocusAreas";
import News from "@/components/News";
import MediaGallery from "@/components/MediaGallery";
import CallToAction from "@/components/CallToAction";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    headline: "SATYAKARMA",
    punchline: "Doing Good, Together.",
  },
  hi: {
    headline: "सत्यकर्म",
    punchline: "भलाई करें, साथ मिलकर।",
  },
};

const Index = () => {
  const { language } = useLanguage();
  const { headline, punchline } = translations[language];

  return (
    <div className="min-h-screen">
      <Navigation />
      <BackgroundPaths title={headline} punchline={punchline} />
      <MissionOverview />
      <FocusAreas />
      <News />
      <MediaGallery />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
