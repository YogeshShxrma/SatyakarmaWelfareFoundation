"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

type LeafProps = {
  idx: number;
  total: number;
};

function FallingLeaf({ idx, total }: LeafProps) {
  // Deterministic random seed based on idx (for fallback SSR/CSR)
  const random = (seed: number) => {
    // xmur3 hash + mulberry32 for enough variety
    let t = seed;
    t ^= t << 13; t ^= t >> 17; t ^= t << 5;
    return () => ((t = Math.imul(t, 0x85ebca6b)) >>> 0) / 4294967296;
  };

  const rand = random(idx + 42);
  const startX = rand() * 92 + 4; // vw units
  const sway = 24 + rand() * 24; // px. How much it sways horizontally
  const swayDuration = 3.6 + rand() * 3.4; // seconds, per oscillation
  const scale = 0.8 + rand() * 0.8;
  const rotateStart = rand() * 60 - 30;
  const rotateEnd = rotateStart + rand() * 60 - 30;
  const fallDuration = 11 + rand() * 10; // seconds
  const delay = rand() * 7;

  // Colors in nature palette
  const colors = [
    "#7a917a", // sage-400
    "#87a055", // green-500
    "#bfa890", // earth-400
    "#e9cfa3", // gentle yellow
    "#a0b7a0", // gray-green
  ];
  const color = colors[idx % colors.length];

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${startX}vw`,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.42 + ((idx % 5) * 0.09),
        filter: "blur(0.5px)",
      }}
      initial={{ y: -80 }}
      animate={{
        y: ["-80px", "105vh"], // from just above to far below
        x: [
          0, sway, -sway, sway / 2, 0
        ],
        rotate: [rotateStart, rotateEnd, rotateStart],
        opacity: [0, 1, 1, 0.8, 0],
      }}
      transition={{
        duration: fallDuration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        times: [0, 0.25, 0.7, 0.96, 1],
      }}
      aria-hidden
    >
      <Leaf
        size={30 * scale}
        color={color}
        strokeWidth={1 + scale * 0.5}
        className="drop-shadow-[0_1px_4px_rgba(106,121,95,0.13)]"
        aria-label=""
        focusable="false"
      />
    </motion.div>
  );
}

function FallingLeavesBG() {
  const total = 22;
  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full">
      {Array.from({ length: total }).map((_, idx) => (
        <FallingLeaf key={idx} idx={idx} total={total} />
      ))}
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
      <FallingLeavesBG />
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center flex flex-col items-center">
        {/* Animated Logo placed above the headline */}
        <AnimatedLogo />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tighter font-inter">
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
                    className="inline-block font-inter text-neutral-900 dark:text-white"
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
