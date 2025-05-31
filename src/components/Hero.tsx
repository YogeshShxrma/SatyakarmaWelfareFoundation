
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      ></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Search for Truth Through
          <span className="text-green-300 block">Action</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Join SatyaKarma Welfare Foundation Society in creating a sustainable future 
          through environmental protection, community empowerment, and children's health initiatives.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg">
            Act for Earth
          </button>
          <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            Learn More
          </button>
        </div>
        
        <div className="mt-12 animate-bounce">
          <ArrowDown className="h-8 w-8 text-white mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
