import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

// The component now accepts an `imgSrc` prop for the background image.
function ParallaxImage({ scrollerRef, imgSrc }) {

  const vidSrc='https://res.cloudinary.com/due7t0ksr/video/upload/v1756146527/Hiring_gymoxo.mp4' || imgSrc;
  // const vidSrc='https://res.cloudinary.com/due7t0ksr/video/upload/v1756146259/Turf-Night-TKN_jz59iy.mp4' || imgSrc;
  const parallaxRef = useRef(null);
  const backgroundRef = useRef(null);
  const floatingElementsRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = scrollerRef?.current;
    const parallaxElement = parallaxRef.current;
    const background = backgroundRef.current;
    const floatingElements = floatingElementsRef.current;
    const content = contentRef.current;
    
    if (!container || !parallaxElement) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const parallaxWidth = parallaxElement.offsetWidth;
      
      const parallaxPosition = scrollLeft - (parallaxElement.offsetLeft - container.offsetLeft);
      
      if (parallaxPosition >= -parallaxWidth && parallaxPosition <= containerWidth) {
        const visibleRatio = Math.max(0, Math.min(1, (containerWidth - parallaxPosition) / containerWidth));
        
        if (background) {
          gsap.set(background, {
            x: parallaxPosition * 0.1,
            scale: 1 + (visibleRatio * 0.05),
            opacity: 0.6 + (visibleRatio * 0.4)
          });
        }
        
        if (content) {
          gsap.set(content, {
            x: parallaxPosition * 0.4,
            y: parallaxPosition * 0.1,
            scale: 1 + (visibleRatio * 0.1)
          });
        }
        
        if (floatingElements) {
          const elements = floatingElements.querySelectorAll('.floating-element');
          elements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.15);
            const ySpeed = 0.05 + (index * 0.02);
            
            gsap.set(element, {
              x: parallaxPosition * speed,
              y: parallaxPosition * ySpeed + Math.sin(parallaxPosition * 0.01 + index) * 15,
              opacity: 0.3 + (visibleRatio * 0.7)
            });
          });
        }
        
        const peelEffect = Math.max(0, Math.min(1, (parallaxPosition + containerWidth * 0.5) / (containerWidth * 0.5)));
        if (background) {
          gsap.set(background, {
            'clip-path': `polygon(0 0, ${100 - peelEffect * 20}% 0, ${100 - peelEffect * 10}% 100%, 0 100%)`
          });
        }
      }
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, [scrollerRef]);

  return (
    <div className="relative min-w-screen h-full overflow-hidden" ref={parallaxRef}>
      {/* Background container now holds both the image and the gradient overlay */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 flex"
      >
        {/* First video - takes up 1/3 of the height */}
        <video 
          src={'https://res.cloudinary.com/due7t0ksr/video/upload/v1756146883/web-crafter-amrik-sir_mdxg2x.mp4'} 
          className="w-1/3 h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Second video - takes up 1/3 of the height */}
        <video 
          src="https://res.cloudinary.com/due7t0ksr/video/upload/v1756146259/Turf-Night-TKN_jz59iy.mp4" 
          className="w-1/3 h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* Third video - takes up 1/3 of the height */}
        <video 
          src="https://res.cloudinary.com/due7t0ksr/video/upload/v1756146527/Hiring_gymoxo.mp4" 
          className="w-1/3 h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        
        {/* The gradient overlay */}
        <div 
          className="absolute inset-0"
          // className="absolute inset-0 bg-gradient-to-br from-blue-500/50 via-purple-600/50 to-pink-500/50"
        ></div>
      </div>
      
      
      <div ref={contentRef} className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl">
            Discover
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto px-8 drop-shadow-lg">
            Explore the intersection of knowledge, culture, and innovation
          </p>
        </div>
      </div>
      
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="floating-element absolute bottom-20 right-20 w-24 h-24 bg-white/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="floating-element absolute top-1/2 left-1/3 w-16 h-16 bg-white/25 rounded-full blur-md animate-pulse delay-500"></div>
        <div className="floating-element absolute top-1/3 right-1/4 w-20 h-20 bg-white/15 rounded-full blur-sm animate-pulse delay-700"></div>
        <div className="floating-element absolute bottom-1/3 left-1/2 w-28 h-28 bg-white/10 rounded-full blur-2xl animate-pulse delay-300"></div>
      </div>
      
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-white/10 pointer-events-none"></div>
    </div>
  );
}

export default ParallaxImage;
