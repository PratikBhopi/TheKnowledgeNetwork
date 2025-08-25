"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { throttle } from 'lodash';

// Corrected image paths for use with the `public` directory
const imageUrls = [
  'https://res.cloudinary.com/due7t0ksr/image/upload/v1756144675/Tkn-Girls_yfpfec.jpg',
  'https://res.cloudinary.com/due7t0ksr/image/upload/v1756144674/tkn-boys2_aezrvy.jpg',
  'https://res.cloudinary.com/due7t0ksr/image/upload/v1756144675/tkn-boys1_ib26dl.jpg',
  'https://res.cloudinary.com/due7t0ksr/image/upload/v1756144675/tkn-girls2_e9qhkx.jpg',
  'https://res.cloudinary.com/due7t0ksr/image/upload/v1756144673/Podcast-team_lsqymk.png'
];

function ImageTrail() {
  const containerRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const activeImagesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const showImage = throttle((e) => {
      const currentPos = { x: e.offsetX, y: e.offsetY };
      const deltaX = currentPos.x - lastPosRef.current.x;
      const maxRotation = 15;
      const rotation = Math.max(-maxRotation, Math.min(maxRotation, deltaX * 0.1));
      lastPosRef.current = currentPos;

      const maxImages = 6;
      if (activeImagesRef.current.length >= maxImages) {
        const oldestImage = activeImagesRef.current.shift();
        gsap.to(oldestImage, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            if (oldestImage.parentNode === container) {
              container.removeChild(oldestImage);
            }
          }
        });
      }

      const imageDiv = document.createElement('div');
      const img = document.createElement('img');

      imageDiv.className = "w-[180px] h-[180px] rounded-lg overflow-hidden shadow-xl absolute pointer-events-none";
      img.className = "w-full h-full object-cover";
      img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
      imageDiv.appendChild(img);

      // --- THE FIX: Set the initial state BEFORE appending to the DOM ---
      gsap.set(imageDiv, {
        x: currentPos.x - 90,
        y: currentPos.y - 90,
        scale: 0,
        opacity: 0,
        rotation: rotation - 15,
      });

      // Now, add the pre-styled element to the container
      container.appendChild(imageDiv);
      activeImagesRef.current.push(imageDiv);

      // Animate the image from its initial state
      gsap.timeline({
        onComplete: () => {
          if (imageDiv.parentNode) {
            container.removeChild(imageDiv);
          }
          activeImagesRef.current = activeImagesRef.current.filter(el => el !== imageDiv);
        }
      })
      .to(imageDiv, {
        scale: 1,
        opacity: 1,
        rotation: rotation,
        duration: 0.5,
        ease: 'power3.out',
      })
      .to(imageDiv, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      }, "+=1.5");

    }, 200);

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
