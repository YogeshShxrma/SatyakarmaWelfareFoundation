import React, { memo } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

// Seeded pseudo random generator (Mulberry32)
function seededRandom(seed: number) {
  let t = seed + 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// 5 color palette
const LEAF_COLORS = [
  "#7a917a",    // sage green
  "#87a055",    // vibrant green
  "#bfa890",    // earth tone
  "#e9cfa3",    // gentle yellow
  "#a0b7a0"     // gray-green
];

interface LeafConfig {
  id: number;
  x: number;
  sway: number;
  startRotation: number;
  endRotation: number;
  scale: number;
  color: string;
  duration: number;
  delay: number;
  opacity: number;
  stroke: string;
  strokeWidth: number;
  zIndex: number;
}

function generateLeafConfigs(count: number, seedBase = 20240613): LeafConfig[] {
  const arr: LeafConfig[] = [];
  for (let i = 0; i < count; ++i) {
    // Use deterministic "random" for each leaf
    const rand = (factor: number) => seededRandom(seedBase + i * 17 + Math.floor(factor * 100));
    const x = 4 + rand(1.1) * 92; // 4vw to 96vw
    const sway = 24 + rand(2.2) * 24; // 24-48px
    const startRotation = -60 + rand(4.5) * 120; // -60~+60 deg
    const endRotation = -60 + rand(5.7) * 120; // -60~+60 deg
    const scale = 0.8 + rand(3.3) * 0.8; // 0.8-1.6
    const colorIdx = Math.floor(rand(7.0) * LEAF_COLORS.length);
    const color = LEAF_COLORS[colorIdx];
    const duration = 11 + rand(1.8) * 10; // 11-21s
    const delay = rand(10.3) * 7; // 0-7s
    const opacity = 0.42 + (i % 5) * 0.09;
    const stroke = "#42453a";
    const strokeWidth = 1 + rand(22) * 1; // 1-2px (scale with size)
    const zIndex = 0;
    arr.push({
      id: i,
      x,
      sway,
      startRotation,
      endRotation,
      scale,
      color,
      duration,
      delay,
      opacity,
      stroke,
      strokeWidth,
      zIndex
    });
  }
  return arr;
}

const leafConfigs = generateLeafConfigs(22);

const swayKeyframes = (idx: number, sway: number) => {
  // Five keyframes: [0, sway, -sway, sway/2, 0]
  const direction = idx % 2 === 0 ? 1 : -1;
  // Parity keeps left/right variety stable
  return [
    0,
    direction * sway,
    -direction * sway,
    direction * sway * 0.5,
    0
  ];
};
const opacityKeyframes = [0, 1, 1, 0.8, 0];
const keyframeTimes = [0, 0.25, 0.7, 0.96, 1];

const FallingLeaves: React.FC = memo(() => (
  <div
    className="pointer-events-none absolute inset-0 w-full h-full select-none overflow-hidden z-0"
    aria-hidden="true"
    style={{ userSelect: "none" }}
  >
    {leafConfigs.map((cfg, idx) => (
      <motion.div
        key={cfg.id}
        initial={false}
        animate={{
          y: ["-80px", "105vh"],
          x: swayKeyframes(idx, cfg.sway),
          rotate: [cfg.startRotation, cfg.endRotation],
          opacity: opacityKeyframes
        }}
        transition={{
          duration: cfg.duration,
          times: keyframeTimes,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          delay: cfg.delay
        }}
        style={{
          position: "absolute",
          left: `${cfg.x}vw`,
          top: 0,
          zIndex: cfg.zIndex,
          filter: `blur(0.5px) drop-shadow(0 1.2px 3px rgba(92,116,92,0.06))`,
          opacity: cfg.opacity,
          pointerEvents: "none"
        }}
        aria-hidden="true"
        tabIndex={-1}
      >
        <Leaf
          size={30 * cfg.scale}
          color={cfg.color}
          style={{ display: "block" }}
          strokeWidth={cfg.strokeWidth}
          stroke={cfg.stroke}
          focusable="false"
          aria-hidden="true"
        />
      </motion.div>
    ))}
  </div>
));

export default FallingLeaves;
