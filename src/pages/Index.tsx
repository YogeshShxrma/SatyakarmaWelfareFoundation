
import MissionOverview from "@/components/MissionOverview";
import FocusAreas from "@/components/FocusAreas";
import News from "@/components/News";
import MediaGallery from "@/components/MediaGallery";
import CallToAction from "@/components/CallToAction";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { useTranslation } from "@/hooks/useTranslation";
import { TranslationProvider } from "@/context/TranslationContext";

const Index = () => {
  // The translation logic is provided via context across the app for all 
  // nested components to use useTranslation().
  return (
    <TranslationProvider>
      <div className="min-h-screen">
        <Navigation />
        <BackgroundPaths />
        <MissionOverview />
        <FocusAreas />
        <News />
        <MediaGallery />
        <CallToAction />
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default Index;
