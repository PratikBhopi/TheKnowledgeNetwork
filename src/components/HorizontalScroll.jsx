import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import BottomBar from './BottomBar';
import Intro from './@scroll-components/Intro';
import WhoWeAre from './@scroll-components/WhoWeAre';
import WhatWeDo from './@scroll-components/WhatWeDo';
import EventsCulture from './@scroll-components/EventsCulture';
import JoinUs from './@scroll-components/JoinUs';
import AnimatedDottedLine from './@scroll-components/AnimatedDottedLine';
import Logo from './Logo';

// Import the TimelineCard component and the dummy data
import TimelineCard from './@Timeline-Cards/TimelineCard1';
import { timelineData } from '../Data/Timelinedata'; // Adjust path if needed

function HorizontalScroll() {
  const lineContainerRef = useRef(null);
  // Create a ref for the main horizontal scrolling container.
  const scrollContainerRef = useRef(null);

  useLayoutEffect(() => {
    const animation = gsap.to(lineContainerRef.current, {
      y: -400,
      duration: 10,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
    return () => animation.kill();
  }, []);

  // Smooth horizontal scrolling on wheel using GSAP
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Quick setter for performant scroll tweens
    const tweenTo = gsap.quickTo(container, 'scrollLeft', {
      duration: 0.5,
      ease: 'power2.out',
    });

    const onWheel = (e) => {
      // Allow pinch-zoom or horizontal scroll gestures natively
      if (e.ctrlKey) return;
      e.preventDefault();
      const intensity = 1.2; // tune for speed
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const target = container.scrollLeft + delta * intensity;
      tweenTo(target);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-white text-black">
      <div
        ref={lineContainerRef}
        className="pointer-events-none absolute bottom-20 left-0 z-40  w-full"
      >
        <AnimatedDottedLine />
      </div>

      {/* Attach the ref to the scrolling container here. */}
      <div ref={scrollContainerRef} className="h-full overflow-y-hidden overflow-x-auto scrollbar-hide will-change-transform">
        <div className="flex h-full" style={{ width: 'max-content' }}>
          <Intro />
          <WhoWeAre />

          {/* Cinematic timeline rail with airy spacing and straight alignment */}
          <div className="flex items-center scale-[0.6] pt-10">
            <div className="flex w-full items-start space-x-[300px]">
              {timelineData.map((item) => (
                <TimelineCard
                  key={item.id}
                  // Pass the scroller ref down to each card for the animation.
                  scrollerRef={scrollContainerRef}
                  imgSrc={item.imgSrc}
                  title={item.title}
                  size={item.size}
                  offsetY={item.offsetY}
                  rotateDeg={item.rotateDeg}
                  mediaShape={item.mediaShape}
                >
                  {item.description.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </TimelineCard>
              ))}
            </div>
          </div>

          <WhatWeDo />
          <EventsCulture />
          <JoinUs />
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default HorizontalScroll;