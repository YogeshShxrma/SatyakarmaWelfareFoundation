
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1594736797933-d0402ba9f838?q=80&w=2070&auto=format&fit=crop')`
        }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-lato font-bold mb-6 leading-tight">
          Act With Compassion,
          <span className="block text-3xl md:text-5xl mt-2 text-primary">Rise for Earth</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-90 max-w-3xl mx-auto">
          Join us in building a plastic-free, mindful, and kind world through 
          community action and environmental consciousness.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/get-involved" className="bg-primary text-primary-foreground py-4 px-8 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Volunteer With Us
          </Link>
          <Link to="/get-involved" className="border-2 border-primary text-primary py-4 px-8 rounded-xl font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105">
            Join Our Program
          </Link>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
