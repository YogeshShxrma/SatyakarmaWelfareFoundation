
import { ArrowDown, Leaf, Heart, Users } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-violet-500 to-orange-400"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/15 rounded-full animate-float delay-500"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/25 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-float delay-700"></div>
      </div>
      
      {/* Dotted Pattern Overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }}></div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo with Animation */}
        <div className="mb-8 animate-scale-in">
          <div className="relative inline-block">
            <img 
              src="/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png" 
              alt="SatyaKarma Welfare Foundation Logo" 
              className="w-32 h-32 mx-auto mb-6 rounded-full shadow-2xl animate-pulse-glow"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-coral-400 rounded-full animate-bounce-slow"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-teal-400 rounded-full animate-bounce-slow delay-500"></div>
          </div>
        </div>

        {/* Main Headline - Girls Who Code Style */}
        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight animate-fade-in font-montserrat">
          <span className="block">Act for Earth.</span>
          <span className="block text-yellow-300 animate-fade-in delay-300">Move for Health.</span>
          <span className="block text-coral-300 animate-fade-in delay-500">Build the Future.</span>
        </h1>
        
        {/* Tagline */}
        <div className="mb-8 animate-fade-in delay-700">
          <p className="text-2xl md:text-3xl text-white/90 mb-4 font-bold">
            कर्म में सत्य की खोज करें
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
            Join thousands of young changemakers creating a sustainable future through 
            environmental action, children's wellness, and community empowerment.
          </p>
        </div>
        
        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in delay-1000">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all hover-scale">
            <Leaf className="h-12 w-12 text-green-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Plastic-Free Planet</h3>
            <p className="text-white/80 text-sm">Compostable alternatives & cleanup drives</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all hover-scale delay-200">
            <Heart className="h-12 w-12 text-coral-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Active Kids, Bright Futures</h3>
            <p className="text-white/80 text-sm">Fitness awareness in schools</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all hover-scale delay-300">
            <Users className="h-12 w-12 text-violet-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Green Communities</h3>
            <p className="text-white/80 text-sm">Tree planting & grassroots action</p>
          </div>
        </div>
        
        {/* Bold CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-1000">
          <button className="bg-white text-violet-600 px-10 py-5 rounded-full text-xl font-black hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl hover-scale border-4 border-white">
            Volunteer Now
          </button>
          <button className="bg-transparent border-4 border-white text-white px-10 py-5 rounded-full text-xl font-black hover:bg-white/20 backdrop-blur-sm transition-all transform hover:scale-105 shadow-2xl hover-scale">
            Join Our Tree Drive
          </button>
        </div>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="h-12 w-12 text-white mx-auto opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
