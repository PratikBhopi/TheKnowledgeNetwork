import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import BottomBar from './BottomBar';
import Intro from './@scroll-components/Intro';
import WhoWeAre from './@scroll-components/WhoWeAre';
import WhatWeDo from './@scroll-components/WhatWeDo';
import EventsCulture from './@scroll-components/EventsCulture';
import JoinUs from './@scroll-components/JoinUs';
import ParallaxImage from './@scroll-components/ParallaxImage';
import AnimatedDottedLine from './@scroll-components/AnimatedDottedLine';
import Logo from './Logo';

// Import the TimelineCard component and the dummy data
import TimelineCard from './@Cards/TimelineCard1';
import { timelineData } from '../Data/Timelinedata'; // Adjust path if needed
import ImageTrail from './@Cards/ImageTrail';

function HorizontalScroll() {
  const lineContainerRef = useRef(null);
  // Create a ref for the main horizontal scrolling container.
  const scrollContainerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

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
    <div className="relative h-screen overflow-hidden text-black">
      <div className='absolute left-8 top-8'><Logo/></div>
      <div
        ref={lineContainerRef}
        className="pointer-events-none absolute bottom-20 left-0 z-40 w-full"
      >
        {/* Pass the scrollerRef to the AnimatedDottedLine component */}
        <AnimatedDottedLine scrollerRef={scrollContainerRef} />
      </div>

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative bg-black rounded-lg overflow-hidden w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video src={activeVideo} className="w-full h-full" controls autoPlay />
            <button
              aria-label="Close"
              className="absolute -top-10 right-0 text-white text-sm"
              onClick={() => setActiveVideo(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Attach the ref to the scrolling container here. */}
      <div ref={scrollContainerRef} className="h-full overflow-y-hidden overflow-x-auto scrollbar-hide will-change-transform">
        <div className="flex h-full" style={{ width: 'max-content' }}>
          <Intro />
          <WhoWeAre />
        
          {/* Cinematic timeline rail with airy spacing and straight alignment */}
          <div className="flex  items-center scale-[0.8] pt-10">
            <div className="flex w-full items-start  space-x-[300px]">
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
                  isClickable={Boolean(item.videoSrc)}
                  onMediaClick={() => item.videoSrc && setActiveVideo(item.videoSrc)}
                >
                  {item.description.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </TimelineCard>
              ))}
            </div>
          </div>
            
          {/* <WhatWeDo /> */}
          {/* <EventsCulture /> */}
          
          {/* Parallax Image Section */}
          <ParallaxImage scrollerRef={scrollContainerRef} imgSrc={'../public/tkn-logo.jpg'} />
          
          <JoinUs  />
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default HorizontalScroll;