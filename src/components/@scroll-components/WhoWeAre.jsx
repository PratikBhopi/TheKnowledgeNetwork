import React from 'react';
import { motion } from 'framer-motion';
import ImageTrail from '../@Cards/ImageTrail'; // Adjusted import path

function WhoWeAre() {
  const words = ["Laugh.", "Learn.", "Lead.", "Level up.", "Liberate."];

  const marqueeVariants = {
    animate: {
      y: "-50%",
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="min-w-screen h-full flex flex-col items-center justify-center px-8 relative">
      {/* --- Branded Animated Word Column --- */}
      <div className="absolute top-0 left-10 h-full w-24 overflow-hidden border-slate-200 border-l border-r opacity-[0.5]">
        <motion.div
          className="w-full"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...words, ...words].map((word, index) => (
            <div key={index} className="flex justify-center text-5xl font-bold mb-10">
              <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                {word}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Original Content */}
      <div className="text-center max-w-4xl">
        <h2 className="text-6xl md:text-8xl font-light mb-8">
          Who We Are
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          A community of learners, creators, and innovators passionate about sharing knowledge...
        </p>
      </div>

      {/* --- ImageTrail Container --- */}
      {/* This div is absolutely positioned to the right, taking up 40% of the viewport width. */}

    </div>
  );
}

export default WhoWeAre;
