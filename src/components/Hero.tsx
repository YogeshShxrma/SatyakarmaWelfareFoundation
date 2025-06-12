import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import GlareCard from "./ui/GlareCard";
const Hero = () => {
  return <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 to-earth-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
        backgroundSize: '30px 30px'
      }}></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8 fade-in mx-0 px-0 my-[35px]">
          <img src="/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png" alt="SatyaKarma Welfare Foundation Logo" className="w-20 h-20 mx-auto mb-6 rounded-full shadow-md object-cover" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-lato font-bold text-gray-800 mb-6 leading-tight slide-up">
          Clean Earth.
          <span className="block text-sage-600">Active Children.</span>
          <span className="block text-ocean-600">Greener Future.</span>
        </h1>
        
        {/* Sanskrit Tagline */}
        <div className="mb-8 fade-in" style={{
        animationDelay: '0.3s'
      }}>
          <p className="text-xl text-gray-600 mb-3 font-medium">
            कर्म में सत्य की खोज करें
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Searching for truth through action. Building sustainable communities 
            through environmental awareness, children's wellness, and collaborative partnerships.
          </p>
        </div>
        
        {/* Action Cards with GlareCard effect */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 fade-in" style={{
        animationDelay: '0.6s'
      }}>
          <GlareCard>
            <div className="p-6">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Plastic-Free Planet</h3>
              <p className="text-sm text-gray-600">Promoting compostable alternatives and environmental awareness</p>
            </div>
          </GlareCard>
          
          <GlareCard>
            <div className="p-6 px-[44px]">
              <div className="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Children</h3>
              <p className="text-sm text-gray-600">Physical wellness and health awareness programs for kids</p>
            </div>
          </GlareCard>
          
          <GlareCard>
            <div className="p-6 px-[37px] py-[23px]">
              <div className="w-12 h-12 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-earth-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Green Communities</h3>
              <p className="text-sm text-gray-600">Tree planting and community partnership initiatives</p>
            </div>
          </GlareCard>
        </div>
        
        {/* CTAs with navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in" style={{
        animationDelay: '0.9s'
      }}>
          <Link to="/get-involved" className="bg-sage-600 text-white px-8 py-3 font-medium hover:bg-sage-700 transition-colors shadow-sm rounded-2xl">
            Volunteer with Us
          </Link>
          <Link to="/get-involved" className="border border-sage-600 text-sage-600 px-8 py-3 font-medium hover:bg-sage-50 transition-colors rounded-2xl">
            Join Our Programs
          </Link>
        </div>
        
        <div className="mt-16 fade-in" style={{
        animationDelay: '1.2s'
      }}>
          <ArrowDown className="h-6 w-6 text-gray-400 mx-auto animate-bounce" />
        </div>
      </div>
    </div>;
};
export default Hero;