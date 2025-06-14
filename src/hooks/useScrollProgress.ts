
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Returns normalized scroll progress [0,1] for the viewport.
 */
export function useScrollProgress(): number {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
  });

  return progress;
}
