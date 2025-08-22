import AnimatedDottedLine from './AnimatedDottedLine'

function Intro() {
  return (
    <div className="min-w-screen h-full flex items-stretch px-8">
      {/* Left column content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-light leading-tight">
            Where it all begins.
          </h1>
          {/* Body copy */}
          <div className="space-y-4 text-gray-700 text-base md:text-lg">
            <p>
              When someone asked, “you guys want a website?”, we said “Sure! But what’s a website?”
            </p>
            <p>
              Now we know. Follow along as we share how The Knowledge Network came to be and where we are headed next.
            </p>
          </div>
        </div>
      </div>

      {/* Right column placeholder for image (user will add) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[80%] aspect-[4/3] border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
          Add your image here
        </div>
      </div>
    </div>
  )
}

export default Intro
