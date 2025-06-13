
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const ParallaxHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-sage-100 to-earth-100 dark:from-gray-800 dark:to-gray-900"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Glare overlay that follows mouse */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            <Leaf className="w-4 h-4 text-sage-400 dark:text-sage-300 opacity-40" />
          </div>
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8 hero-fade-in mx-0 px-0 my-[35px]">
          <img 
            src="/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png" 
            alt="SatyaKarma Welfare Foundation Logo" 
            className="w-20 h-20 mx-auto mb-6 rounded-full shadow-lg object-cover" 
          />
        </div>

        {/* Main Headline with enhanced animations */}
        <h1 className="text-4xl md:text-6xl font-lato font-bold text-gray-800 dark:text-white mb-6 leading-tight hero-slide-up">
          Clean Earth.
          <span className="block text-sage-600 dark:text-sage-400">Active Children.</span>
          <span className="block text-ocean-600 dark:text-ocean-400">Greener Future.</span>
        </h1>
        
        {/* Sanskrit Tagline */}
        <div className="mb-8 hero-fade-in-delayed">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-3 font-medium">
            कर्म में सत्य की खोज करें
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Searching for truth through action. Building sustainable communities 
            through environmental awareness, children's wellness, and collaborative partnerships.
          </p>
        </div>
        
        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 hero-fade-in-delayed">
          <Link 
            to="/get-involved"
            className="group relative bg-sage-600 dark:bg-sage-500 text-white px-8 py-4 font-medium hover:bg-sage-700 dark:hover:bg-sage-600 transition-all duration-300 shadow-lg hover:shadow-xl rounded-2xl transform hover:scale-105 hover:glow overflow-hidden"
          >
            <span className="relative z-10">Join the Change</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
          </Link>
          <Link 
            to="/what-we-do"
            className="group relative border-2 border-sage-600 dark:border-sage-400 text-sage-600 dark:text-sage-400 px-8 py-4 font-medium hover:bg-sage-50 dark:hover:bg-sage-900 transition-all duration-300 rounded-2xl transform hover:scale-105 hover:shadow-lg overflow-hidden"
          >
            <span className="relative z-10">Learn to Compost</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sage-200 dark:via-sage-700 to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
          </Link>
        </div>
        
        <div className="hero-fade-in-delayed">
          <ArrowDown className="h-6 w-6 text-gray-400 dark:text-gray-500 mx-auto animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default ParallaxHero;
