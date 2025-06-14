
import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Animated SatyaKarma logo with scroll-triggered expansion & punchline reveal.
 * - Locks scroll until logo is fully expanded.
 */
const LOGO_SRC = "/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png";
const PUNCHLINE = "Nurturing Earth, Empowering Change";

export function ExpandingLogo() {
  // Track scroll position from 0 (top) to 1 (bottom)
  const scrollY = useScrollProgress();

  // The range over which the expansion/fade happens
  const revealStart = 0;
  const revealEnd = 0.3;

  // Clamp progress for the expansion phase
  const localProgress = Math.max(0, Math.min(1, (scrollY - revealStart) / (revealEnd - revealStart)));

  // Motion values and transforms for animation
  // Logo scale: from 0.77 --> 1.34 as page is scrolled 0 -> revealEnd
  const scale = useSpring(0.77 + localProgress * 0.57, { stiffness: 120, damping: 22 });

  // Logo shadow intensity (smooth glow as it expands)
  const shadowStrength = useSpring(0.17 + localProgress * 0.35, { stiffness: 120, damping: 20 });

  // Create a derived boxShadow value using useTransform
  const boxShadow = useTransform(
    shadowStrength,
    (s) =>
      `0 0 0.5vw ${1.5 + s * 8.5}vw rgba(100,180,120,${s * 0.23 + 0.07}), 0 0.6vw 2vw 0 rgba(130,150,110,${s * 0.17 + 0.08}), 0 2vw 6vw 0 rgba(20,70,70,${s * 0.10})`
  );

  // Punchline effect: fade in & slide from below as logo expands
  const punchlineOpacity = useSpring(localProgress, { stiffness: 120, damping: 20 });
  const punchlineY = useSpring(36 * (1 - localProgress), { stiffness: 140, damping: 22 });
  const punchlineX = useSpring(24 * (1 - localProgress), { stiffness: 140, damping: 22 });

  // Responsive logo size (controlled by Tailwind + scale)
  // We grow base size with breakpoints, but always animate scale
  const logoBaseClasses = "w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 transition-all duration-300 rounded-full object-cover bg-white";

  // Prevent scrolling until revealEnd reached (for focus on hero)
  useEffect(() => {
    const shouldLock = scrollY < revealEnd;
    const html = document.documentElement;
    if (shouldLock) {
      html.style.overflow = "hidden";
      // For iOS Safari, also set body
      document.body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      document.body.style.overflow = "";
    }
    // On unmount, always unlock scroll
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [scrollY, revealEnd]);

  return (
    <div
      className="flex flex-col items-center justify-center pointer-events-none select-none"
      aria-label="SatyaKarma Foundation Logo and Tagline"
      style={{ width: "100%", position: "relative", zIndex: 30 }}
    >
      <motion.div
        aria-label="SatyaKarma Logo"
        layout
        style={{
          scale,
          boxShadow, // use derived motion value
          filter:
            "drop-shadow(0 4px 36px rgba(80,120,80,0.10)) drop-shadow(0 0 0.5vw rgba(100,180,120,0.07))",
        }}
        className="mx-auto"
        initial={{ scale: 0.77 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
      >
        <img
          src={LOGO_SRC}
          alt="SatyaKarma Welfare Foundation Logo"
          className={logoBaseClasses + " shadow-lg bg-white"}
          draggable={false}
        />
      </motion.div>
      <motion.div
        aria-label="Nurturing Earth, Empowering Change - tagline"
        initial={false}
        style={{
          opacity: punchlineOpacity,
          y: punchlineY,
          x: punchlineX,
          filter: "drop-shadow(0 2px 12px rgba(80,120,80,0.09))",
          pointerEvents: "none",
        }}
        className="mt-5 sm:mt-6 max-w-3xl px-4 xs:px-6 text-center"
      >
        <h2
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold font-lato text-sage-700 dark:text-sage-300"
          style={{ lineHeight: 1.25, letterSpacing: "0.01em" }}
        >
          {PUNCHLINE}
        </h2>
      </motion.div>
    </div>
  );
}
