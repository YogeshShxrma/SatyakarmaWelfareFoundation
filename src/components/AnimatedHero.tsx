
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingPathsProps {
  position: 1 | -1;
}

const FloatingPaths: React.FC<FloatingPathsProps> = ({ position }) => {
  // Generate 36 unique path elements with different properties
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M${10 + i * 5},${20 + i * 3} Q${30 + i * 7},${10 + i * 4} ${50 + i * 6},${25 + i * 2} T${80 + i * 4},${15 + i * 5}`,
    strokeWidth: 0.5 + (i % 3) * 0.3,
    opacity: 0.1 + (i % 4) * 0.05,
    animationDelay: i * 0.1,
    x: (i % 6) * 100,
    y: (i % 6) * 80,
    scale: 0.8 + (i % 3) * 0.4,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden ${position === -1 ? 'transform scale-x-[-1]' : ''}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.strokeWidth}
            fill="none"
            className="text-sage-300 dark:text-sage-700"
            initial={{ 
              opacity: 0,
              x: path.x,
              y: path.y,
              scale: path.scale
            }}
            animate={{
              opacity: [path.opacity, path.opacity * 1.5, path.opacity],
              x: [path.x, path.x + 20, path.x - 15, path.x],
              y: [path.y, path.y - 10, path.y + 5, path.y],
              scale: [path.scale, path.scale * 1.1, path.scale * 0.9, path.scale],
            }}
            transition={{
              duration: 8 + (path.id % 3) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: path.animationDelay,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const AnimatedHero: React.FC = () => {
  const title = "SATYAKARMA";
  const subtitle = "Nurturing Earth, Empowering Change";

  // Letter animation variants
  const letterVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.8,
      rotate: -10
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        delay: i * 0.08,
      }
    })
  };

  // Subtitle animation variants
  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: title.length * 0.08 + 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-500">
      {/* Floating Background Paths - Left Side */}
      <FloatingPaths position={1} />
      
      {/* Floating Background Paths - Right Side (Mirrored) */}
      <FloatingPaths position={-1} />
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Animated NGO Name */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-1 sm:gap-2"
            initial="hidden"
            animate="visible"
          >
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sage-600 via-earth-600 to-ocean-600 dark:from-sage-400 dark:via-earth-400 dark:to-ocean-400 font-lato"
                style={{
                  textShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Animated Punchline */}
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-sage-700 dark:text-sage-300 font-medium leading-relaxed font-inter">
            {subtitle}
          </p>
        </motion.div>

        {/* Subtle decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: title.length * 0.08 + 1.2,
            duration: 0.6,
            ease: "easeOut"
          }}
          className="mt-8 sm:mt-12 flex justify-center"
        >
          <div className="w-16 h-1 bg-gradient-to-r from-sage-400 via-earth-400 to-ocean-400 rounded-full"></div>
        </motion.div>
      </div>

      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-radial from-sage-50/30 via-transparent to-transparent dark:from-sage-900/20 pointer-events-none"></div>
    </section>
  );
};

export default AnimatedHero;
