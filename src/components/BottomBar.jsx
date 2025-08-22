function BottomBar() {
  return (
    <div className="fixed  s:w-[80vw] lg:w-[35vw] bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-[#262626] text-white rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-sm shadow-black/10">
        
        {/* Left section */}
        <div className="flex items-center gap-2 text-sm font-light">
          <span className="text-lg">👋</span>
          <span className="tracking-wide">Welcome to The Knowledge Network</span>
        </div>

        {/* Right button */}
        <button className="w-8 h-8 flex items-center justify-center text-gray-700 text-white transition-colors rounded-full border border-gray-300 hover:border-gray-400">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default BottomBar;
