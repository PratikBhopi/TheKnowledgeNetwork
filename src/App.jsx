import { useRef, useEffect, useState } from 'react'
import BottomBar from './components/BottomBar'
import FirstPage from './components/FirstPage'
import HorizontalScroll from './components/HorizontalScroll'
import Logo from './components/Logo'
import StoryScroller from './components/StoryScroller'
import JoinUs from './components/@scroll-components/JoinUs'

function App() {
  const [showHorizontalScroll, setShowHorizontalScroll] = useState(false)
  const horizontalContainerRef = useRef(null)

  const handleGoButton = () => {
    setShowHorizontalScroll(true)
  }

  // Handle vertical scroll to horizontal scroll conversion
  useEffect(() => {
    if (!showHorizontalScroll) return

    // Find the horizontal scroll container after component mounts
    const container = document.querySelector('.scrollbar-hide')
    if (!container) return

    const handleWheel = (e) => {
      e.preventDefault()
      
      // Convert vertical scroll to horizontal scroll
      const scrollAmount = e.deltaY > 0 ? 120 : -120
      container.scrollLeft += scrollAmount
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [showHorizontalScroll])

  //bg-[#F2F2F2]
  return (
    <div className="h-screen bg-white text-black overflow-hidden">
      {/* First Page - Clean, Minimal Design */}
      {!showHorizontalScroll && (
        <FirstPage onGoClick={handleGoButton} />
      )}

      {/* Horizontal Scrolling Section */}
      {showHorizontalScroll && (
        <HorizontalScroll />
        // <StoryScroller />
      )}
    </div>
  )
}

export default App
