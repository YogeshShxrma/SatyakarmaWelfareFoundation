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
      e.preventDefault();
      if (e.deltaY > 0 && !isExpanded) {
        // Scrolling down - expand
        accumulatedScroll += Math.abs(e.deltaY);
      } else if (e.deltaY < 0 && accumulatedScroll > 0) {
        // Scrolling up - reverse
        accumulatedScroll -= Math.abs(e.deltaY);
        accumulatedScroll = Math.max(0, accumulatedScroll);
        setIsExpanded(false);
      }
      const progress = Math.min(accumulatedScroll / scrollThreshold, 1);
      setScrollProgress(progress);
      if (progress >= 1 && !isExpanded) {
        setIsExpanded(true);
        document.body.style.overflow = 'auto';
      } else if (progress < 1 && isExpanded) {
        setIsExpanded(false);
        document.body.style.overflow = 'hidden';
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      const startY = e.touches[0].clientY;
      const handleTouchMove = (moveEvent: TouchEvent) => {
        const currentY = moveEvent.touches[0].clientY;
        const deltaY = startY - currentY;
        moveEvent.preventDefault();
        if (deltaY > 0 && !isExpanded) {
          // Swiping up - expand
          accumulatedScroll += Math.abs(deltaY) * 2;
        } else if (deltaY < 0 && accumulatedScroll > 0) {
          // Swiping down - reverse
          accumulatedScroll -= Math.abs(deltaY) * 2;
          accumulatedScroll = Math.max(0, accumulatedScroll);
          setIsExpanded(false);
        }
        const progress = Math.min(accumulatedScroll / scrollThreshold, 1);
        setScrollProgress(progress);
        if (progress >= 1 && !isExpanded) {
          setIsExpanded(true);
          document.body.style.overflow = 'auto';
          document.removeEventListener('touchmove', handleTouchMove);
        } else if (progress < 1 && isExpanded) {
          setIsExpanded(false);
          document.body.style.overflow = 'hidden';
        }
      };
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false
      });
      document.addEventListener('touchend', handleTouchEnd);
    };

    // Prevent scrolling initially
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', handleWheel, {
        passive: false
      });
      document.addEventListener('touchstart', handleTouchStart, {
        passive: false
      });
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isExpanded]);

  // Animation values based on scroll progress
  const logoScale = 0.8 + scrollProgress * 0.6; // Scale from 0.8 to 1.4
  const logoOpacity = 0.8 + scrollProgress * 0.2; // Opacity from 0.8 to 1
  const textOpacity = scrollProgress > 0.6 ? (scrollProgress - 0.6) * 2.5 : 0;
  const textTranslateY = 20 - scrollProgress * 20;
  const glowIntensity = scrollProgress * 15;
  return <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-50 via-white to-sage-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(92, 116, 92, 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} className="absolute inset-0 " />
      </div>

      {/* Main content container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Logo with scroll-triggered expansion */}
        <motion.div className="mb-8 flex justify-center" style={{
        transform: `scale(${logoScale})`,
        opacity: logoOpacity,
        filter: `drop-shadow(0 0 ${glowIntensity}px rgba(92, 116, 92, 0.4))`
      }} animate={{
        scale: logoScale,
        opacity: logoOpacity
      }} transition={{
        duration: 0.3,
        ease: "easeOut"
      }}>
          <img src={mediaSrc} alt={`${title} Logo`} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl" />
        </motion.div>

        {/* Title */}
        <motion.h1 className="text-4xl md:text-6xl font-lato font-bold text-gray-800 dark:text-white mb-4" initial={{
        opacity: 0.8
      }} animate={{
        opacity: logoOpacity
      }} transition={{
        duration: 0.3
      }}>
          {title}
        </motion.h1>

        {/* Punchline with scroll-triggered animation */}
        <motion.div className="mb-8" style={{
        opacity: textOpacity,
        transform: `translateY(${textTranslateY}px)`
      }} animate={{
        opacity: textOpacity,
        y: textTranslateY
      }} transition={{
        duration: 0.3,
        ease: "easeOut"
      }}>
          <p className="text-xl md:text-2xl text-sage-700 dark:text-sage-300 font-medium leading-relaxed">
            {punchline}
          </p>
        </motion.div>

        {/* Scroll prompt - centered and responsive */}
        {!isExpanded && <motion.div animate={{
        y: [0, -10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute left-1 transform -translate-x-1/2 w-full px-4 ">
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-2 mx-auto max-w-xs">
              {scrollToExpand}
            </p>
            <div className="flex justify-center">
              <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>}

        {/* Progress indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          {/* Progress bar could be added here if needed */}
        </div>
      </div>
    </div>;
};
export default MinimalHero;