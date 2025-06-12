
import { Link } from "react-router-dom";
import GlareCard from "./ui/GlareCard";

const StoriesSection = () => {
  const stories = [
    {
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7f09?q=80&w=2070&auto=format&fit=crop",
      title: "Children Leading Environmental Change",
      excerpt: "Young eco-warriors from local schools organized a massive cleanup drive, removing over 500kg of plastic waste from their community.",
      readTime: "3 min read"
    },
    {
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
      title: "Plastic-Free Schools Initiative",
      excerpt: "15 schools in the region have successfully eliminated single-use plastics, teaching students sustainable alternatives.",
      readTime: "4 min read"
    },
    {
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop",
      title: "Community Garden Revolution",
      excerpt: "Families unite to create organic community gardens, fostering environmental awareness and healthy living practices.",
      readTime: "5 min read"
    }
  ];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-foreground mb-6">
            Stories of Change
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real impact stories from our community initiatives and environmental programs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <GlareCard key={index} className="h-full scroll-reveal">
              <div className="overflow-hidden h-full flex flex-col">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${story.image})`}}></div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary font-medium">Impact Story</span>
                    <span className="text-sm text-muted-foreground">{story.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow mb-4">
                    {story.excerpt}
                  </p>
                  <Link 
                    to="/blog" 
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center group"
                  >
                    Read More 
                    <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                </div>
              </div>
            </GlareCard>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
          >
            View All Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
