import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GetInvolvedHero from "@/components/getinvolved/GetInvolvedHero";
import GetInvolvedForm from "@/components/getinvolved/GetInvolvedForm";
import GetInvolvedPrivacyPolicy from "@/components/getinvolved/GetInvolvedPrivacyPolicy";

const GetInvolved = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <GetInvolvedHero />
      <GetInvolvedForm />
      <GetInvolvedPrivacyPolicy />
      <Footer />
    </div>
  );
};

export default GetInvolved;
