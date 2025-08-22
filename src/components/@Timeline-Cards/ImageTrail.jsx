"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { throttle } from 'lodash';

// Corrected image paths for use with the `public` directory
const imageUrls = [
  '/tkn-logo.jpg',
  '/tkn-logo.jpg',
  '/tkn-logo.jpg'
];

function ImageTrail() {
  const containerRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });
  // A ref to keep track of the currently visible image elements
  const activeImagesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Throttled Image Creation Function ---
    const showImage = throttle((e) => {
      const currentPos = { x: e.offsetX, y: e.offsetY };
      const deltaX = currentPos.x - lastPosRef.current.x;
      const maxRotation = 15;
      const rotation = Math.max(-maxRotation, Math.min(maxRotation, deltaX * 0.1));
      lastPosRef.current = currentPos;

      // --- Limit the number of active images ---
      const maxImages = 6;
      if (activeImagesRef.current.length >= maxImages) {
        // If the limit is reached, remove the oldest image
        const oldestImage = activeImagesRef.current.shift();
        gsap.to(oldestImage, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            if (oldestImage.parentNode === container) {
              container.removeChild(oldestImage);
            }
          }
        });
      }

      // --- Create and Animate the New Image ---
      const imageDiv = document.createElement('div');
      const img = document.createElement('img');

      imageDiv.className = "w-[180px] h-[180px] rounded-lg overflow-hidden shadow-xl absolute pointer-events-none";
      img.className = "w-full h-full object-cover";
      img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];

      // Set the final position of the element before adding it to the DOM
      gsap.set(imageDiv, {
        position: 'absolute',
        left: currentPos.x - 90, // Center based on new 180px size
        top: currentPos.y - 90,
        rotation: rotation, // Set the final rotation
      });

      imageDiv.appendChild(img);
      container.appendChild(imageDiv);

      activeImagesRef.current.push(imageDiv);

      // --- THE FIX: Use gsap.from() for a direct pop-in animation ---
      // This animates FROM the specified values TO the current state we just set.
      gsap.from(imageDiv, {
        opacity: 0,
        scale: 0,
        rotation: rotation - 10, // Animate from a slightly different rotation
        duration: 2,
        ease: 'power3.out',
      });

    }, 200); // Throttle: Increased to 200ms for a less crowded feel

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
