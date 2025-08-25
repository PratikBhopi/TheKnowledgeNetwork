import AnimatedDottedLine from './AnimatedDottedLine'

function Intro() {
  return (
    <div className="min-w-screen h-full flex items-stretch px-8 '">
      {/* Left column content */}
      <div className="flex-1 flex flex-col justify-start">
        <div className='h-40'></div>
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-light text-center leading-tight">
            Where it all begins.
          </h1>
          {/* Body copy */}
          <div className='h-40'>

          </div>
          <div className="space-y-4 text-left md:text-lg">
            <p>
             Every journey begins with a spark — one idea, a quiet thought, shared by a friend and carried forward by a few dreamers.<br/>
            Together, they gathered not just to learn, but to laugh, to create, and to experience life beyond the ordinary.     <br/>
            From those small beginnings grew a community — a circle of curiosity and wonder, where stories unfold and growth is a shared adventure.
         </p>
          </div>
        </div>
      </div>

      {/* Right column placeholder for image (user will add) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[80%] aspect-[4/3] rounded-xl flex items-center justify-center text-gray-400">
          <img  className=" w-full" src="https://res.cloudinary.com/due7t0ksr/image/upload/v1756144673/TKN_LOGO_PNG_a930pp.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Intro
