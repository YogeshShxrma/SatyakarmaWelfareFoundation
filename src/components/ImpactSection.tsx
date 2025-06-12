
import { TreePine, Heart, Users } from "lucide-react";
import GlareCard from "./ui/GlareCard";

const ImpactSection = () => {
  const impacts = [
    {
      icon: TreePine,
      title: "Plastic-Free Planet",
      stat: "5,000+",
      description: "Plastic items replaced with eco-friendly alternatives"
    },
    {
      icon: Heart,
      title: "Active Children",
      stat: "1,200+",
      description: "Children engaged in health and wellness programs"
    },
    {
      icon: Users,
      title: "Green Community",
      stat: "50+",
      description: "Communities transformed through environmental initiatives"
    }
  ];

  return (
    <section className="py-20 bg-brand-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-dark mb-6">
            Our Impact
          </h2>
          <p className="text-lg text-deepblue max-w-2xl mx-auto">
            Measuring our success through the positive changes we create in communities and the environment
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <GlareCard key={index} className="h-full">
              <div className="p-8 text-center h-full flex flex-col bg-white">
                <div className="mb-6">
                  <impact.icon className="h-16 w-16 text-blue mx-auto mb-4" />
                  <h3 className="text-2xl font-lato font-bold text-dark mb-2">
                    {impact.title}
                  </h3>
                </div>
                <div className="flex-grow">
                  <div className="text-4xl md:text-5xl font-bold text-lightblue mb-4">
                    {impact.stat}
                  </div>
                  <p className="text-deepblue leading-relaxed">
                    {impact.description}
                  </p>
                </div>
              </div>
            </GlareCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
