
import Hero from "@/components/Hero";
import MissionOverview from "@/components/MissionOverview";
import FocusAreas from "@/components/FocusAreas";
import News from "@/components/News";
import MediaGallery from "@/components/MediaGallery";
import CallToAction from "@/components/CallToAction";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
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
