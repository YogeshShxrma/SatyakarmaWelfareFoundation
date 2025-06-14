
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

// Add Lucide React for icons (Leaf, Trees)
import { Leaf, TreePine } from "lucide-react";

function FloatingPaths({
  position
}: {
  position: number;
}) {
  const paths = Array.from({
    length: 36
  }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03
  }));
  return <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
                <title>Background Paths</title>
                {paths.map(path => <motion.path key={path.id} d={path.d} stroke="currentColor" strokeWidth={path.width} strokeOpacity={0.1 + path.id * 0.03} initial={{
        pathLength: 0.3,
        opacity: 0.6
      }} animate={{
        pathLength: 1,
        opacity: [0.3, 0.6, 0.3],
        pathOffset: [0, 1, 0]
      }} transition={{
        duration: 20 + Math.random() * 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear"
      }} />)}
            </svg>
        </div>;
}

// NEW: Minimal leaves and trees in background
const BgDecor = () => (
  <div className="pointer-events-none absolute inset-0 z-0">
    <Leaf className="absolute top-8 left-10 text-green-200 opacity-40 w-8 h-8 rotate-[-12deg]" />
    <TreePine className="absolute bottom-16 left-24 text-green-300 opacity-30 w-12 h-12" />
    <Leaf className="absolute bottom-16 right-10 text-emerald-200 opacity-30 w-10 h-10 rotate-6" />
    <TreePine className="absolute top-20 right-24 text-emerald-300 opacity-40 w-10 h-10" />
    {/* Add more if desired */}
  </div>
);

import AnimatedLogo from "./AnimatedLogo"; // Add import for animated logo

// Accept punchline prop for translation
export function BackgroundPaths({
  title = "Background Paths",
  punchline = "Doing Good, Together.",
}: {
  title?: string;
  punchline?: string;
}) {
  const words = title.split(" ");
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <BgDecor />
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
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
            {punchline}
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
