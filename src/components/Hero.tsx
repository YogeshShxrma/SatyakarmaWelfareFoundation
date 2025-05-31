
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      ></div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src="/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png" 
            alt="SatyaKarma Welfare Foundation Logo" 
            className="w-48 h-48 mx-auto mb-6 animate-scale-in"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in shadow-text">
          SatyaKarma
          <span className="text-blue-300 block animate-fade-in delay-300">Welfare Foundation</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-white mb-4 max-w-4xl mx-auto font-semibold animate-fade-in delay-500 shadow-text">
          कर्म में सत्य की खोज करें
        </p>
        
        <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto animate-fade-in delay-700 shadow-text">
          Join SatyaKarma Welfare Foundation Society in creating a sustainable future 
          through environmental protection, community empowerment, and children's health initiatives.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-1000">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-2xl hover-scale">
            Act for Earth
          </button>
          <button className="bg-white/90 backdrop-blur-sm text-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all transform hover:scale-105 shadow-2xl hover-scale">
            Learn More
          </button>
        </div>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="h-10 w-10 text-white mx-auto shadow-text" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
