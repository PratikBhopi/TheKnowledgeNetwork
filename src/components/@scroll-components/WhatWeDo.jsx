function WhatWeDo() {
  return (
    <div className="min-w-screen h-full flex items-center justify-center px-8">
      <div className="text-center max-w-4xl">
        <h2 className="text-6xl md:text-8xl font-light mb-8">
          What We Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-2xl font-light mb-4">Bootcamps</h3>
            <p className="text-gray-600">Intensive learning experiences</p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-2xl font-light mb-4">Events</h3>
            <p className="text-gray-600">Community gatherings & workshops</p>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-2xl font-light mb-4">Podcasts</h3>
            <p className="text-gray-600">Knowledge sharing through audio</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatWeDo


