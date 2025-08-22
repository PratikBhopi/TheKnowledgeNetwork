function EventsCulture() {
  return (
    <div className="min-w-screen h-full flex items-center justify-center px-8">
      <div className="text-center max-w-4xl">
        <h2 className="text-6xl md:text-8xl font-light mb-8">
          Events & Culture
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12">
          Where learning meets fun, music, and community spirit
        </p>
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-20 h-20 border-2 border-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
            <p className="text-gray-600">Music</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 border-2 border-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
            <p className="text-gray-600">Fun</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsCulture


