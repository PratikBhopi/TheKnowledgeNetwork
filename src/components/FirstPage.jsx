import Logo from './Logo'
import SpiralAnimation from './SpiralAnimation'

function FirstPage({ onGoClick }) {
  return (
    <div className="h-full flex flex-col relative">
      {/* Top Section with Years */}
      <div className="flex justify-between items-start pt-8 px-8">
        {/* <span className=""><Logo/></span> */}
        <div className="w-16 h-px bg-black"></div>
        <span className="text-2xl font-light">2025</span>
      </div>

      {/* Main Title */}
      <div className="flex-1 flex items-start justify-center px-8">
        <h1 className="text-4xl md:text-6xl lg:text-4xl font-extralight text-center leading-tight max-w-4xl">
        “A journey without end, where each circle brings us closer to who we are meant to become.”
        </h1>
      </div>

      {/* Spiral Animation */}
      <div className="flex-1 flex items-center absolute left-1/2 -translate-x-1/2 top-0 justify-center px-8 pb-20">
        <SpiralAnimation />
      </div>

      {/* Go Button */}
      <div className="absolute bottom-8 right-8">
        <button
          onClick={onGoClick}
          className="flex items-center gap-2 px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          Go
        </button>
      </div>
    </div>
  )
}

export default FirstPage
