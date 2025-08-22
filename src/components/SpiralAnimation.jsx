"use client"

import { motion } from "framer-motion"

export default function SpiralAnimation() {
  const circles = Array.from({ length: 12 }, (_, i) => (i + 1) * 40)

  return (
    <div className="flex items-center justify-center h-full bg-transparent perspective-1000">
      <motion.div
        className="transform-gpu"
        animate={{
          rotateX: [0, 15, 0, -15, 0],
          rotateY: [0, 25, 0, -25, 0],
          rotateZ: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <svg width="800" height="800" viewBox="0 0 800 800" className="overflow-visible">
          {circles.map((r, i) => (
            <motion.circle
              key={i}
              cx="400"
              cy="400"
              r={r}
              fill="none"
              stroke="black"
              strokeWidth="1.5"
              strokeDasharray="3 6"
              opacity={0.8 - i * 0.05}
              animate={{
                y: [0, -20, 0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}

          {/* <motion.path
            d="M 400 400 
               Q 420 380, 440 400
               Q 460 420, 480 400
               Q 500 380, 520 400
               Q 540 420, 560 400"
            fill="none"
            stroke="black"
            strokeWidth="2"
            opacity={0.6}
            animate={{
              y: [0, -10, 0, 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              rotate: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          /> */}
        </svg>
      </motion.div>
    </div>
  )
}
