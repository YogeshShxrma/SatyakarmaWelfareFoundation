
"use client";

import { motion } from "framer-motion";
// Removed: import { Button } from "@/components/ui/button";
import { Leaf, TreeDeciduous, TreePine, Trees } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo"; // Existing animated logo

// Helper: environmental icons list for random selection & subtlety
const NATURE_ICONS = [
  { Component: Leaf, color: "#7a917a" },       // sage-400
  { Component: Leaf, color: "#bfa890" },       // earth-400
  { Component: TreeDeciduous, color: "#5c745c" }, // sage-500
  { Component: TreePine, color: "#0ea5e9" },   // ocean-500
  { Component: Trees, color: "#a68b6b" },      // earth-500
];

type NatureIconProps = {
  idx: number,
  icon: typeof NATURE_ICONS[number],
  position: number,
  total: number
};

function NatureIcon({ idx, icon, position, total }: NatureIconProps) {
  // Random but deterministic scatter and float for each icon
  // Different positions, scales, and rotations for a natural feel
  const angle = (idx * 360) / total;
  const radius = 160 + (idx % 4) * 80 + position * 24;
  const baseX = Math.cos(angle * Math.PI / 180) * radius + 350; // center around middle of "696"
  const baseY = Math.sin(angle * Math.PI / 180) * radius + 220; // center around "316"
  const scale = 0.8 + ((idx % 3) * 0.4);
  const rotation = ((idx * 13) % 360) * (position === 1 ? 1 : -1);
  const opacity = 0.10 + (idx % 6) * 0.07;
  const floatD = 22 + (idx % 5) * 6;

  const { Component, color } = icon;
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${baseX}px`,
        top: `${baseY}px`,
        pointerEvents: 'none',
        zIndex: 0,
        opacity,
      }}
      initial={{
        y: 0,
        rotate: rotation,
      }}
      animate={{
        y: [0, -floatD, 0, floatD/2, 0],
        rotate: [rotation, rotation + 7, rotation - 5, rotation],
      }}
      transition={{
        duration: 16 + (idx % 7) * 2 + Math.abs(position) * 6,
        repeat: Infinity,
        repeatType: "loop",
        delay: idx * 0.4,
        ease: "easeInOut"
      }}
      aria-hidden
    >
      <Component
        size={34 * scale}
        color={color}
        strokeWidth={1.1 + ((idx % 2) * 0.3)}
        className="drop-shadow-[0_1px_4px_rgba(92,116,92,0.12)]"
        style={{
          filter: 'blur(0.4px)', // subtle softness
          opacity: opacity, // ensure further subtlety
        }}
        aria-label=""
        focusable="false"
      />
    </motion.div>
  );
}

function FloatingNature({ position }: { position: number }) {
  const total = 14; // Number of floating icons
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: 320,
          minWidth: 700,
          maxWidth: "100vw",
        }}
      >
        {Array.from({ length: total }).map((_, idx) => (
          <NatureIcon
            key={idx}
            idx={idx}
            icon={NATURE_ICONS[idx % NATURE_ICONS.length]}
            position={position}
            total={total}
          />
        ))}
      </div>
    </div>
  );
}

export function BackgroundPaths({
  title = "SATYAKARMA"
}: {
  title?: string;
}) {
  const words = title.split(" ");
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        {/* Replaced FloatingPaths with FloatingNature */}
        <FloatingNature position={1} />
        <FloatingNature position={-1} />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center flex flex-col items-center">
        {/* Animated Logo placed above the headline */}
        <AnimatedLogo />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25
                    }}
                    className="inline-block text-transparent bg-clip-text 
                      bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                      dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Punchline below the SATYAKARMA text */}
          <p className="text-lg md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-10 animate-fade-in">
            Doing Good, Together.
          </p>
          <div
            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
              dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
              overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Optionally place button/CTAs here if needed */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
