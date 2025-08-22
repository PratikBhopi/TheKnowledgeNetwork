import BottomBar from './BottomBar'
import Intro from './@scroll-components/Intro'
import WhoWeAre from './@scroll-components/WhoWeAre'
import WhatWeDo from './@scroll-components/WhatWeDo'
import EventsCulture from './@scroll-components/EventsCulture'
import JoinUs from './@scroll-components/JoinUs'
import AnimatedDottedLine from './@scroll-components/AnimatedDottedLine'
import Logo from './Logo'

function HorizontalScroll() {
  return (
    <div className="h-screen bg-white text-black overflow-hidden relative">
      <div className='pt-8 px-8 '><Logo /></div>
      {/* Fixed dotted line overlay */}
      <div className="pointer-events-none absolute left-0 bottom-24 z-40">
        <AnimatedDottedLine />
      </div>

      {/* Horizontal scrolling container */}
      <div className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide">
        {/* Single continuous content flow */}
        <div className="flex h-full" style={{ width: 'max-content' }}>
          <Intro />
          <WhoWeAre />
          <WhatWeDo />
          <EventsCulture />
          <JoinUs />
        </div>
      </div>

      {/* Bottom Bar Component */}
      <BottomBar />
    </div>
  )
}

export default HorizontalScroll

