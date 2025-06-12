
import { Link } from "react-router-dom";
import { HandHeart, DollarSign, Users } from "lucide-react";
import GlareCard from "./ui/GlareCard";

const HowYouCanHelpSection = () => {
  const helpOptions = [
    {
      icon: HandHeart,
      title: "Volunteer",
      description: "Get involved in fieldwork and awareness campaigns. Join our community initiatives and make a direct impact.",
      cta: "Start Volunteering"
    },
    {
      icon: DollarSign,
      title: "Donate",
      description: "Support our eco-education drives and community programs. Help us reach more children and families.",
      cta: "Support Our Cause"
    },
    {
      icon: Users,
      title: "Sponsor a Child",
      description: "Help children grow into eco-conscious leaders. Sponsor their environmental education and development.",
      cta: "Sponsor Now"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-foreground mb-6">
            Your Role in a Kinder World
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every action counts in creating a sustainable future. Choose how you want to contribute to positive change.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {helpOptions.map((option, index) => (
            <GlareCard key={index} className="h-full scroll-reveal">
              <div className="p-8 text-center h-full flex flex-col">
                <div className="mb-6">
                  <option.icon className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-lato font-bold text-foreground mb-4">
                    {option.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {option.description}
                </p>
                <Link 
                  to="/get-involved" 
                  className="bg-primary text-primary-foreground py-3 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 inline-block"
                >
                  {option.cta}
                </Link>
              </div>
            </GlareCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowYouCanHelpSection;
