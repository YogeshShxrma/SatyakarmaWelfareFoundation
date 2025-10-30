
import React from "react";
import { motion, useScroll, useTransform, easeInOut } from "framer-motion";

/**
 * Animated SatyaKarma logo (zooms up on scroll)
 */
const AnimatedLogo: React.FC = () => {
  // Animate scale from 1 to 1.3 (grow bigger) between 0 and 300px scroll
  const { scrollY } = useScroll();
  const scale = useTransform(
    scrollY,
    [0, 300],
    [1, 1.3],
    { ease: easeInOut }
  );
  const opacity = useTransform(
    scrollY,
    [0, 300],
    [1, 0.82] // Slight fade for extra smoothness
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
      }}
      className="w-full flex justify-center items-center mb-6"
      aria-label="SatyaKarma Logo"
    >
      <img
        src="/assets/logo.png"
        alt="SatyaKarma Logo"
        className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-xl object-cover bg-white"
        draggable={false}
      />
    </motion.div>
  );
};

export default AnimatedLogo;

