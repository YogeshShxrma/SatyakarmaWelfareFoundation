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
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-500"
        aria-label="SatyaKarma Home Hero"
      >
        <div className="relative flex flex-col items-center justify-center w-full z-20 py-16 sm:py-24 md:py-36">
          {/* Animated, scroll-reactive logo */}
          <ExpandingLogo />
          {/* Title beneath logo and punchline */}
          <div className="w-full mt-6 sm:mt-10 flex flex-col items-center">
            <BackgroundPaths title="SATYAKARMA" subtitle="Doing Good, Together." />
          </div>
        </div>
        {/* Optionally keep background SVG or effects here */}
        {/* No more absolute positioning for logo to ensure no overlap */}
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
