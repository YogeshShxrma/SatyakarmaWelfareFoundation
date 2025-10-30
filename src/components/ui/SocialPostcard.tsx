import { Heart, MessageCircle, Share } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SocialPostcardProps {
  inspirationText?: string;
  featuredImage?: string;
  className?: string;
}

const SocialPostcard = ({ 
  inspirationText = "Together we rise, together we heal our Earth. Every small action creates ripples of positive change for a sustainable future.",
  featuredImage,
  className = ""
}: SocialPostcardProps) => {
  return (
    <Card className={`w-full max-w-sm mx-auto bg-background border border-border shadow-lg rounded-lg overflow-hidden ${className}`}>
      {/* Header with logo and NGO name */}
      <div className="flex items-center gap-3 p-4 bg-background">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-sage-100 flex items-center justify-center">
          <img 
            src="/assets/logo.png" 
            alt="Satyakarma Earth Rise" 
            className="w-8 h-8 object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-lato font-bold text-sm text-foreground leading-tight">
            Satyakarma Earth Rise
          </h3>
          <p className="text-xs text-muted-foreground">Environmental NGO</p>
        </div>
      </div>

      {/* Inspirational text */}
      <div className="px-4 pb-3">
        <p className="text-sm text-foreground leading-relaxed font-inter">
          {inspirationText}
        </p>
      </div>

      {/* Featured image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-sage-100 to-ocean-100 flex items-center justify-center">
        {featuredImage ? (
          <img 
            src={featuredImage} 
            alt="NGO Activity" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-sage-200 flex items-center justify-center">
              <div className="w-8 h-8 bg-sage-400 rounded-full"></div>
            </div>
            <p className="text-sage-600 text-xs font-medium">Environmental Action</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-around py-3 px-4 border-t border-border bg-muted/30">
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <Heart className="w-4 h-4" />
          <span className="text-xs font-medium">Like</span>
        </button>
        
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-medium">Comment</span>
        </button>
        
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <Share className="w-4 h-4" />
          <span className="text-xs font-medium">Share</span>
        </button>
      </div>
    </Card>
  );
};

export default SocialPostcard;