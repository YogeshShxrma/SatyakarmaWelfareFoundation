
import Hero from "@/components/Hero";
import MissionOverview from "@/components/MissionOverview";
import FocusAreas from "@/components/FocusAreas";
import CallToAction from "@/components/CallToAction";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <MissionOverview />
      <FocusAreas />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
