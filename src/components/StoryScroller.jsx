// src/components/StoryScroller.jsx
// Refactored to use Tailwind CSS classes directly.

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import your story sections
import Intro from "./@scroll-components/Intro";
import WhoWeAre from "./@scroll-components/WhoWeAre";
import WhatWeDo from "./@scroll-components/WhatWeDo";
import EventsCulture from "./@scroll-components/EventsCulture";
import JoinUs from "./@scroll-components/JoinUs";
import AnimatedDottedLine from "./@scroll-components/AnimatedDottedLine";

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

function StoryScroller() {
  const component = useRef(null);
  const slider = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (slider.current.offsetWidth - window.innerWidth),
        },
      });

      panels.forEach((panel) => {
        gsap.from(panel, {
          scale: 0.8,
          opacity: 0.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getTweensOf(panels)[0],
            start: "left 80%",
            end: "left 50%",
            scrub: true,
          },
        });
      });

    }, component);
    return () => ctx.revert();
  }, []);

  return (
    // Use Tailwind classes for the main container
    <div className="h-screen w-full overflow-hidden" ref={component}>
      {/* Use Tailwind for the sliding container. w-[500%] is an arbitrary value for 5 panels. */}
      <div ref={slider} className="flex h-full w-[500%] flex-nowrap">
        {/* Each panel now uses Tailwind classes for styling */}
        <div className="panel flex h-full w-full flex-shrink-0 items-center justify-center">
          <Intro />
        </div>
        <div className="panel flex h-full w-full flex-shrink-0 items-center justify-center">
          <WhoWeAre />
        </div>
        <div className="panel flex h-full w-full flex-shrink-0 items-center justify-center">
          <WhatWeDo />
          <AnimatedDottedLine />
        </div>
        <div className="panel flex h-full w-full flex-shrink-0 items-center justify-center">
          <EventsCulture />
        </div>
        <div className="panel flex h-full w-full flex-shrink-0 items-center justify-center">
          <JoinUs />
        </div>
      </div>
    </div>
  );
}

export default StoryScroller;