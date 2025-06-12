
import { TreePine, Heart, Users } from "lucide-react";
import GlareCard from "./ui/GlareCard";

const ImpactSection = () => {
  const impacts = [
    {
      icon: TreePine,
      title: "Plastic-Free Drives",
      stat: "150+",
      description: "Community drives conducted to eliminate single-use plastics"
    },
    {
      icon: Heart,
      title: "Children Reached",
      stat: "2,500+",
      description: "Young minds educated about environmental consciousness"
    },
    {
      icon: Users,
      title: "Green Projects",
      stat: "75+",
      description: "Community projects creating sustainable change"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-foreground mb-6">
            What We're Changing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Measuring our impact through meaningful actions that create lasting change in communities and environment
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <GlareCard key={index} className="h-full scroll-reveal">
              <div className="p-8 text-center h-full flex flex-col">
                <div className="mb-6">
                  <impact.icon className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-lato font-bold text-foreground mb-2">
                    {impact.title}
                  </h3>
                </div>
                <div className="flex-grow">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-4">
                    {impact.stat}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
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
