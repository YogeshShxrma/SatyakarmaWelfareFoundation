import React from "react";
import { motion, Variants } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Generates and animates a grid of SVG paths based on scroll.
 */
const FloatingPaths: React.FC<{ scroll: number }> = ({ scroll }) => {
  const n = 36;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {Array.from({ length: n }).map((_, i) => {
          // Create varied starting positions and paths
          const baseY = 40 + (i % 6) * 80;
          const x1 = 60 + (i * 17) % 760;
          const x2Base = 350 + ((i * 37) % 350);

          return (
            <motion.path
              key={i}
              stroke="currentColor"
              fill="none"
              initial={{
                d: `M${x1},${baseY} Q${x1 + 85},${baseY - 30} ${x2Base},${baseY + 40}`,
                opacity: 0.08 + (i % 5) * 0.02,
                strokeWidth: 0.5 + (i % 3) * 0.2,
              }}
              animate={{
                d: [
                  `M${x1},${baseY} Q${x1 + 85},${baseY - 30} ${x2Base},${baseY + 40}`,
                  `M${x1},${baseY + 20} Q${x1 + 120},${baseY - 60} ${x2Base + 100},${baseY + 80}`,
                  `M${x1},${baseY - 10} Q${x1 + 50},${baseY + 40} ${x2Base - 50},${baseY + 120}`,
                  `M${x1},${baseY} Q${x1 + 85},${baseY - 30} ${x2Base},${baseY + 40}`,
                ],
                opacity: [
                  0.08 + (i % 5) * 0.02,
                  0.15 + (i % 4) * 0.03 + scroll * 0.1,
                  0.12 + (i % 3) * 0.04,
                  0.08 + (i % 5) * 0.02,
                ],
                strokeWidth: [
                  0.5 + (i % 3) * 0.2,
                  0.8 + (i % 4) * 0.3 + scroll * 0.3,
                  0.6 + (i % 2) * 0.4,
                  0.5 + (i % 3) * 0.2,
                ],
              }}
              transition={{
                duration: 8 + (i % 5) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className="text-sage-300/60 dark:text-sage-700/40"
              style={{
                filter: `blur(${0.5 + (i % 3) * 0.2}px)`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

const AnimatedHero: React.FC = () => {
  const title = "SATYAKARMA";
  const punchline = "Nurturing Earth, Empowering Change";
  const scroll = useScrollProgress();

  // Letter animation (stagger, spring)
  const letterVariants: Variants = {
    hidden: {
      y: 48,
      opacity: 0,
      scale: 0.8,
      rotate: -9,
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 210,
        delay: i * 0.075,
      },
    }),
  };

  // Word-by-word fade-in for title (used for punchline if composed of words)
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.14,
        duration: 0.72,
        ease: [0.19, 1, 0.22, 1], // easeOutExpo
      },
    }),
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-500"
      aria-label="SatyaKarma Welfare Foundation Hero"
    >
      {/* Scroll-Reactive SVG paths */}
      <FloatingPaths scroll={scroll} />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Animated Title */}
        <motion.div
          className="mb-6 sm:mb-10 flex flex-wrap justify-center items-center gap-1 sm:gap-2"
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-sage-600 via-earth-600 to-ocean-600 dark:from-sage-400 dark:via-earth-400 dark:to-ocean-400 bg-clip-text text-transparent font-lato"
              aria-label={letter}
              style={{
                textShadow: "0 4px 8px rgba(0,0,0,0.06)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        {/* Punchline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={wordVariants}
          custom={0}
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-sage-700 dark:text-sage-300 font-medium leading-relaxed font-inter">
            {punchline}
          </p>
        </motion.div>
        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: title.length * 0.08 + 1.5,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mt-8 sm:mt-12 flex justify-center"
        >
          <div className="w-16 h-1 bg-gradient-to-r from-sage-400 via-earth-400 to-ocean-400 rounded-full" />
        </motion.div>
      </div>
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-sage-50/25 via-transparent to-transparent dark:from-sage-950/15 pointer-events-none" />
    </section>
  );
};

export default AnimatedHero;
