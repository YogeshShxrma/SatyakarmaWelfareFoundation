
import React from "react";
import { motion, Variants, useTransform, useMotionValue } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Generates and animates a grid of SVG paths based on scroll.
 */
const FloatingPaths: React.FC<{ scroll: number }> = ({ scroll }) => {
  const n = 36;

  // All scroll-based computations are done imperatively (not reactively with MotionValues),
  // because scroll is now a number from the hook—not a MotionValue!

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
          // Each path is spaced differently, expands as scroll increases
          const baseY = 40 + (i % 6) * 80;
          const yAmp = 80 + (i % 4) * 10;
          const yMiddle = baseY + scroll * yAmp;
          // Opacity and strokeWidth animate subtly on scroll
          const opacity = Math.min(0.12 + (i % 5) * 0.03 + scroll * 0.18, 1);
          const strokeW = 0.6 + (i % 3) * 0.3 + scroll * 0.5;
          // Animate the second endpoint to "stretch"
          const x1 = 60 + (i * 17) % 760;
          const x2 = 350 + ((i * 37) % 350) + scroll * 140 * (i % 2 ? 1 : -1);

          const d = `
            M${x1},${baseY}
            Q${x1 + 85},${baseY - 50 + scroll * (i % 2 === 0 ? 95 : -55)}
              ${x2},${baseY + (i % 3 ? 60 : 100) + scroll * 120}
          `;

          return (
            <motion.path
              key={i}
              d={d}
              stroke="currentColor"
              strokeWidth={strokeW}
              fill="none"
              initial={false}
              className="text-sage-300 dark:text-sage-700"
              style={{
                opacity,
                transition: "opacity 0.4s, stroke-width 0.2s",
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
