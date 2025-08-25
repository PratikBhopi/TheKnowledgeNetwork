"use client";

import React from "react";
import { motion } from "framer-motion";

function RotatingBadge() {
  const text = " The  Knowledge  Network  •  The  Knowledge  Network  • ";
  const radius = 105; // Adjusted for clean spacing between circles

  return (
    <div className="flex items-center justify-center bg-white p-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 20, // rotation speed
          ease: "linear",
        }}
        className="relative w-72 h-72"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Define circular path for text */}
          <defs>
            <path
              id="circlePath"
              d={`
                M 150, 150
                m -${radius}, 0
                a ${radius},${radius} 0 1,1 ${radius * 2},0
                a ${radius},${radius} 0 1,1 -${radius * 2},0
              `}
            />
          </defs>

          {/* Outer circle */}
          <circle
            cx="150"
            cy="150"
            r="135"
            fill="none"
            stroke="black"
            strokeWidth="4"
          />

          {/* Text following circle path */}
          <text
            fill="black"
            fontSize="18"
            fontWeight="bold"
            letterSpacing="2"
          >
            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
              {text}
            </textPath>
          </text>
        </svg>

        {/* Inner circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] border-4 border-black rounded-full" />
      </motion.div>
    </div>
  );
}

export default RotatingBadge;
