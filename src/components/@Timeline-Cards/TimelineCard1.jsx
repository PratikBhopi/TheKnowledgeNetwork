import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// We need to register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// The component now accepts a `scrollerRef` prop to correctly bind the animation.
function TimelineCard({ imgSrc, title, children, size = 'md', offsetY = 0, rotateDeg = 0, mediaShape = 'landscape', scrollerRef }) {
  const cardRef = useRef(null);

  // This effect creates the "pop-up" animation when the card scrolls into view.
  useLayoutEffect(() => {
    // Wait until the component's element and the scroller element are ready.
    if (!cardRef.current || !scrollerRef?.current) return;

    // Set the initial state of the card (invisible and slightly offset).
    gsap.set(cardRef.current, { autoAlpha: 0, y: 60, scale: 0.95 });

    // Create the animation that brings the card to its final state.
    const anim = gsap.to(cardRef.current, {
      duration: 0.8,
      autoAlpha: 1, // Fades in and makes the element interactive.
      y: 0,
      scale: 1,
      ease: 'power3.out',
      // ScrollTrigger ties the animation to the scroll position.
      scrollTrigger: {
        trigger: cardRef.current,
        scroller: scrollerRef.current, // Use the horizontal scroll container.
        horizontal: true,              // IMPORTANT: This tells ScrollTrigger to watch horizontal scrolling.
        start: 'left 90%',             // Start the animation when the card's left edge is 90% from the viewport's left.
        toggleActions: 'play none none reverse', // Play on enter, reverse if you scroll back past it.
      },
    });

    // Cleanup function to remove the animation when the component unmounts.
    return () => {
      anim.kill();
    };
  }, [scrollerRef]); // Rerun the effect if the scrollerRef changes.

  const sizeToWidthClass = {
    sm: 'w-[20vw] max-w-[360px]',
    md: 'w-[26vw] max-w-[480px]',
    lg: 'w-[32vw] max-w-[560px]'
  };

  const mediaHeightBySize = {
    sm: 140,
    md: 180,
    lg: 220,
  };

  const cardWidthClass = sizeToWidthClass[size] || sizeToWidthClass.md;
  const mediaHeight = mediaHeightBySize[size] || mediaHeightBySize.md;

  return (
    <div
      ref={cardRef} // Attach the ref to the main container.
      className={`${cardWidthClass} flex-shrink-0 mix-blend-mulitply`}
      style={{ transform: `translateY(${offsetY}px) rotate(${rotateDeg}deg)` }}
    >
      <div className="bg-white overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 border-l-2 border-gray-300 rounded-none">
        {mediaShape === 'square' ? (
          <div className="relative w-full" style={{ paddingBottom: '100%' }}>
            {imgSrc ? (
              <img src={imgSrc} alt={title} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
                Your Image Here
              </div>
            )}
          </div>
        ) : (
          <div className="w-full" style={{ height: mediaHeight }}>
            {imgSrc ? (
              <img src={imgSrc} alt={title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400">
                Your Image Here
              </div>
            )}
          </div>
        )}

        <div className="relative p-5">
          <div className="absolute left-0 top-5 -translate-x-1 flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-black" />
            <div className="ml-2 h-px w-7 bg-gray-300" />
          </div>
          <h2 className="ml-6 text-xl md:text-2xl font-light leading-tight text-black">
            {title}
          </h2>
          <div className="ml-6 mt-3 space-y-3 text-sm md:text-base text-gray-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineCard;
