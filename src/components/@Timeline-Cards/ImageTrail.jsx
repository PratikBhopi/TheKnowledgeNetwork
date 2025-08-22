"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { throttle } from 'lodash'; // A utility for throttling function calls

// You can replace these with your own image URLs
// const imageUrls = [
//   "https://placehold.co/90x90/E63946/FFFFFF?text=1",
//   "https://placehold.co/90x90/F1FAEE/000000?text=2",
//   "https://placehold.co/90x90/A8DADC/FFFFFF?text=3",
//   "https://placehold.co/90x90/457B9D/FFFFFF?text=4",
//   "https://placehold.co/90x90/1D3557/FFFFFF?text=5",
//   "https://placehold.co/90x90/F4A261/FFFFFF?text=6",
//   "https://placehold.co/90x90/2A9D8F/FFFFFF?text=7",
// ];
const imageUrls=[
  '../public/tkn-logo.jpg',
  '../public/tkn-logo.jpg',
  '../public/tkn-logo.jpg'
]

function ImageTrail() {
  const containerRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const showImage = throttle((e) => {
      const currentPos = { x: e.offsetX, y: e.offsetY };
      const deltaX = currentPos.x - lastPosRef.current.x;
      const maxRotation = 15;
      const rotation = Math.max(-maxRotation, Math.min(maxRotation, deltaX * 0.1));
      lastPosRef.current = currentPos;

      const imageDiv = document.createElement('div');
      const img = document.createElement('img');

      imageDiv.className = "w-[180px] h-[180px] rounded-lg overflow-hidden shadow-xl absolute pointer-events-none";
      img.className = "w-full h-full object-cover";
      img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
      
      // --- THE FIX ---
      // Set the initial position and visibility directly on the element's style
      // This ensures it's created at the correct spot but is invisible.
      gsap.set(imageDiv, {
        position: 'absolute',
        left: currentPos.x - 45, // Center the image
        top: currentPos.y - 45,
        opacity: 0,
        scale: 0,
        rotation: rotation - 10,
      });

      imageDiv.appendChild(img);
      container.appendChild(imageDiv);

      // Animate from the initial state to the final state
      gsap.timeline({
        onComplete: () => {
          container.removeChild(imageDiv);
        }
      })
      .to(imageDiv, {
        opacity: 1,
        scale: 1,
        rotation: rotation,
        duration: 0.4,
        ease: 'power3.out',
      })
      .to(imageDiv, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'power2.in',
      }, "+=0.8");

    }, 150);

    const handleMouseMove = (e) => {
      showImage(e);
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      showImage.cancel();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
    />
  );
}

export default ImageTrail;
