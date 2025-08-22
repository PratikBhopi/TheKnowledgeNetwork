"use client"

import { useEffect, useState, useRef } from "react"

function AnimatedDottedLine() {
  const [pathData, setPathData] = useState("")
  const svgRef = useRef(null)

  // Use refs to store positions to avoid re-renders on every mouse move
  const mousePos = useRef({ x: -999, y: -999 }) // Start off-screen
  const animatedMousePos = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePos.current = { x: event.clientX, y: event.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    let rafId
    const startTime = performance.now() // Record the start time for the wave animation

    // Animation loop to smoothly update the line
    const animate = () => {
      // Calculate elapsed time for the continuous wave motion
      const elapsed = (performance.now() - startTime) / 1000

      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect()
        const targetX = mousePos.current.x - svgRect.left

        // Smoothly interpolate the animated position towards the target
        const interpolationFactor = 0.07
        animatedMousePos.current.x +=
          (targetX - animatedMousePos.current.x) * interpolationFactor

        // --- Path Generation ---
        const width = 900
        const initialY = 70

        // 1. Settings for the default waving motion
        const waveAmplitude = 4 // Small amplitude for a subtle effect
        const waveLength = 250 // Longer wavelength for smoother curves
        const waveSpeed = 0.3 // Slower speed for a gentle motion

        // 2. Settings for the cursor interaction
        const bumpAmplitude = 20
        const bumpSpread = 150

        const points = []
        for (let x = 0; x <= width; x += 10) {
          // Calculate the default waving motion using a sine wave
          const wave =
            waveAmplitude * Math.sin(x / waveLength + elapsed * waveSpeed)

          // Calculate the cursor "bump" using a Gaussian function
          const bump =
            bumpAmplitude *
            Math.exp(
              -Math.pow(x - animatedMousePos.current.x, 2) /
                (2 * Math.pow(bumpSpread, 2))
            )

          // Combine the two effects
          const y = initialY + wave - bump
          points.push(`${x},${y}`)
        }

        setPathData(`M ${points.join(" L ")}`)
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const width = 600
  const height = 140

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "visible", cursor: "pointer" }}
    >
      <path
        d={pathData}
        fill="none"
        stroke="#0c0c0c"
        strokeWidth="1"
        strokeLinecap="round"k
        opacity={0.4}
      />
    </svg>
  )
}

export default AnimatedDottedLine;