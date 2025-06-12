
import { Link } from "react-router-dom";
import GlareCard from "./ui/GlareCard";

const CampaignSection = () => {
  const campaigns = [
    {
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7f09?q=80&w=2070&auto=format&fit=crop",
      title: "Children Lead Clean-up Drive",
      description: "Young environmental champions organize community cleanup initiatives, removing plastic waste and planting trees in their neighborhoods."
    },
    {
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
      title: "Plastic-Free School Campaign",
      description: "Students and teachers work together to eliminate single-use plastics from school premises, promoting sustainable alternatives."
    },
    {
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop",
      title: "Community Garden Initiative",
      description: "Families come together to create organic community gardens, teaching children about sustainable food production and healthy living."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 mb-6">
            Success Stories & Campaigns
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how communities are creating positive change through our programs and initiatives
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <GlareCard key={index} className="h-full">
              <div className="overflow-hidden h-full flex flex-col">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${campaign.image})`}}></div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-grow mb-4">
                    {campaign.description}
                  </p>
                  <Link 
                    to="/blog" 
                    className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </GlareCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
