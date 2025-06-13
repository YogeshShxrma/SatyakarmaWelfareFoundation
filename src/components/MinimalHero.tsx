
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MinimalHeroProps {
  mediaType?: 'image';
  mediaSrc?: string;
  bgImageSrc?: string;
  title?: string;
  punchline?: string;
  scrollToExpand?: string;
}

const MinimalHero: React.FC<MinimalHeroProps> = ({
  mediaType = 'image',
  mediaSrc = '/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png',
  title = 'SATYAKARMA',
  punchline = 'Together Against Plastic Pollution',
  scrollToExpand = 'Scroll to explore'
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let accumulatedScroll = 0;
    const scrollThreshold = 300; // Amount of scroll needed to complete expansion

    const handleWheel = (e: WheelEvent) => {
      if (!isExpanded && e.deltaY > 0) {
        e.preventDefault();
        accumulatedScroll += Math.abs(e.deltaY);
        const progress = Math.min(accumulatedScroll / scrollThreshold, 1);
        setScrollProgress(progress);
        
        if (progress >= 1) {
          setIsExpanded(true);
          // Allow normal scrolling after expansion
          document.body.style.overflow = 'auto';
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isExpanded) {
        const startY = e.touches[0].clientY;
        
        const handleTouchMove = (moveEvent: TouchEvent) => {
          const currentY = moveEvent.touches[0].clientY;
          const deltaY = startY - currentY;
          
          if (deltaY > 0) {
            moveEvent.preventDefault();
            accumulatedScroll += Math.abs(deltaY) * 2; // Make touch more sensitive
            const progress = Math.min(accumulatedScroll / scrollThreshold, 1);
            setScrollProgress(progress);
            
            if (progress >= 1) {
              setIsExpanded(true);
              document.body.style.overflow = 'auto';
              document.removeEventListener('touchmove', handleTouchMove);
            }
          }
        };
        
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        
        const handleTouchEnd = () => {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };
        
        document.addEventListener('touchend', handleTouchEnd);
      }
    };

    // Prevent scrolling initially
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isExpanded]);

  // Animation values based on scroll progress
  const logoScale = 0.8 + (scrollProgress * 0.6); // Scale from 0.8 to 1.4
  const logoOpacity = 0.8 + (scrollProgress * 0.2); // Opacity from 0.8 to 1
  const textOpacity = scrollProgress > 0.6 ? (scrollProgress - 0.6) * 2.5 : 0;
  const textTranslateY = 20 - (scrollProgress * 20);
  const glowIntensity = scrollProgress * 15;

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-50 via-white to-sage-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(92, 116, 92, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Logo with scroll-triggered expansion */}
        <motion.div
          className="mb-8 flex justify-center"
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            filter: `drop-shadow(0 0 ${glowIntensity}px rgba(92, 116, 92, 0.4))`
          }}
          animate={{
            scale: logoScale,
            opacity: logoOpacity
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <img 
            src={mediaSrc}
            alt={`${title} Logo`}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl"
          />
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-4xl md:text-6xl font-lato font-bold text-gray-800 dark:text-white mb-4"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: logoOpacity }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h1>

        {/* Punchline with scroll-triggered animation */}
        <motion.div
          className="mb-8"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`
          }}
          animate={{
            opacity: textOpacity,
            y: textTranslateY
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p className="text-xl md:text-2xl text-sage-700 dark:text-sage-300 font-medium leading-relaxed">
            {punchline}
          </p>
        </motion.div>

        {/* Scroll prompt (visible when not expanded) */}
        {!isExpanded && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {scrollToExpand}
            </p>
            <div className="flex justify-center">
              <svg 
                className="w-6 h-6 text-gray-400 dark:text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        )}

        {/* Progress indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sage-600 dark:bg-sage-400 rounded-full"
              style={{ width: `${scrollProgress * 100}%` }}
              animate={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalHero;
