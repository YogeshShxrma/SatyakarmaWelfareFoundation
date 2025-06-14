
import { motion, useSpring } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * SatyaKarma logo that expands as you scroll down on the page.
 * Appears above the hero title.
 */
const LOGO_SRC = "/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png";

export function ExpandingLogo() {
  // Scroll progress from 0 (top) to 1 (bottom of viewport)
  const scrollY = useScrollProgress();
  // Animate scale between 1 (at top) and 1.4 (at 25% scroll), then clamp
  // (value mapping: progress [0, 0.25] => scale [1, 1.4], then rest stays)
  const scale = useSpring(scrollY <= 0.25 ? 1 + scrollY * 1.6 : 1.4, { stiffness: 120, damping: 18 });

  return (
    <motion.div
      style={{
        scale: scale,
        filter: "drop-shadow(0 6px 20px rgba(90,120,90,0.14))",
      }}
      className="mx-auto mb-6 flex items-center justify-center"
      aria-label="SatyaKarma Logo"
    >
      <img
        src={LOGO_SRC}
        alt="SatyaKarma Welfare Foundation Logo"
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-white shadow-lg transition-all duration-300"
        draggable={false}
      />
    </motion.div>
  );
}
