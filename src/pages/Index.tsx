
import MissionOverview from "@/components/MissionOverview";
import FocusAreas from "@/components/FocusAreas";
import News from "@/components/News";
import MediaGallery from "@/components/MediaGallery";
import CallToAction from "@/components/CallToAction";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ExpandingLogo } from "@/components/ui/ExpandingLogo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section with animated logo and background paths */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-500" aria-label="SatyaKarma Home Hero">
        {/* Animated, scroll-reactive logo */}
        <div className="absolute top-12 left-0 w-full flex justify-center z-30 pointer-events-none">
          <ExpandingLogo />
        </div>
        {/* Animated BackgroundPaths with title beneath logo and punchline */}
        <BackgroundPaths title="SATYAKARMA" subtitle="Doing Good, Together." />
      </section>
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
