
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-foreground mb-8">
            About Satyakarma Earth Rise
          </h2>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed mb-8">
            <p className="text-lg mb-6">
              Satyakarma Earth Rise is dedicated to spreading awareness, compassion, and environmental 
              consciousness through mindful actions. We believe that every small step towards sustainability 
              creates ripples of positive change in our communities.
            </p>
            <p className="text-lg mb-6">
              Our mission centers around building a plastic-free world, nurturing environmental awareness 
              in children, and fostering mindful living practices. Through community-driven initiatives, 
              we empower individuals to become conscious stewards of our planet.
            </p>
            <p className="text-lg">
              Join us in this journey of transformation, where compassion meets action, and together 
              we rise for Earth's future.
            </p>
          </div>
          <Link 
            to="/about" 
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Know More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
