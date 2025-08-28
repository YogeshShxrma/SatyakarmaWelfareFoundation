import SocialPostcard from "@/components/ui/SocialPostcard";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SocialPreview = () => {
  const navigate = useNavigate();

  const inspirationTexts = [
    "Together we rise, together we heal our Earth. Every small action creates ripples of positive change for a sustainable future.",
    "Nature doesn't hurry, yet everything is accomplished. Join us in protecting our planet, one step at a time.",
    "The Earth does not belong to us; we belong to the Earth. Let's nurture it with love and responsibility.",
    "Every tree planted, every river cleaned, every life touched - we're building a better tomorrow for all."
  ];

  const featuredImages = [
    "/src/assets/tree-planting.jpg",
    "/src/assets/community-development.jpg", 
    "/src/assets/children-education.jpg",
    "/src/assets/plastic-waste.jpg"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-ocean-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-2xl font-lato font-bold text-foreground">Social Media Postcards</h1>
            <p className="text-muted-foreground">Facebook-style postcards for WhatsApp status sharing</p>
          </div>
        </div>

        {/* Postcards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {inspirationTexts.map((text, index) => (
            <div key={index} className="relative group">
              <SocialPostcard 
                inspirationText={text}
                featuredImage={featuredImages[index]}
              />
              
              {/* Download overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Default postcard without image */}
        <div className="max-w-sm mx-auto">
          <h2 className="text-lg font-lato font-semibold mb-4 text-center text-foreground">
            Default Template
          </h2>
          <SocialPostcard />
        </div>
      </div>
    </div>
  );
};

export default SocialPreview;