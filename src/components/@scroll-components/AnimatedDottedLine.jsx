"use client"

import { useEffect, useState, useRef } from "react"

function AnimatedDottedLine({ width = 1100 }) {
  const [pathData, setPathData] = useState("")
  // New state to track the position of the circle at the end of the line
  const [endPoint, setEndPoint] = useState({ x: width, y: 70 });
  const svgRef = useRef(null)

  // This ref will now hold an array of points, creating the "rope"
  const pointsRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // --- Initialization ---
    // Create the initial points for the line on mount
    const initialY = 70;
    const segments = 50; // The number of points in our "rope"
    const segmentLength = width / segments;
    pointsRef.current = Array.from({ length: segments + 1 }, (_, i) => ({
      x: i * segmentLength,
      y: initialY,
    }));
    setEndPoint({ x: width, y: initialY }); // Set initial end point

    // --- Event Listener ---
    const handleMouseMove = (event) => {
      mousePos.current = { x: event.clientX, y: event.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // --- Animation Loop ---
    let rafId
    const animate = () => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect()
        // The target Y position is the mouse's Y relative to the SVG
        const targetY = mousePos.current.y - svgRect.top;

        // The last point of the line (the "leader") smoothly follows the mouse
        const leader = pointsRef.current[pointsRef.current.length - 1];
        const interpolationFactor = 0.05; // Controls how fast the end follows the mouse
        leader.y += (targetY - leader.y) * interpolationFactor;

        // Each subsequent point smoothly follows the point in front of it
        const followFactor = 0.5; // Controls the "stiffness" of the rope
        for (let i = pointsRef.current.length - 2; i >= 0; i--) {
          const point = pointsRef.current[i];
          const nextPoint = pointsRef.current[i + 1];
          point.y += (nextPoint.y - point.y) * followFactor;
        }

        // Convert the points array into an SVG path string
        const newPathData = "M " + pointsRef.current.map(p => `${p.x},${p.y}`).join(" L ");
        setPathData(newPathData);
        setEndPoint({ x: leader.x, y: leader.y });
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    // --- Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [width]) // Rerun effect if width changes

  const height = 140

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        overflow: "visible",
        cursor: "pointer",
        mixBlendMode: "multiply",
      }}
    >
      {/* The main line path */}
      <path
        d={pathData}
        fill="none"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.9}
      />
      {/* The circle at the end of the line */}
      <circle
        cx={endPoint.x}
        cy={endPoint.y}
        r="4" // Radius of the circle
        fill="black"
        opacity={0.9}
      />
    </svg>
  )
}

export default AnimatedDottedLine;