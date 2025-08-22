"use client"

import { useEffect, useState, useRef } from "react"

// The component now accepts a `scrollerRef` to be aware of the horizontal scroll position.
function AnimatedDottedLine({ width = 1100, scrollerRef }) {
  const [pathData, setPathData] = useState("");
  const [endPoint, setEndPoint] = useState({ x: width, y: 70 });
  const [dynamicStrokeWidth, setDynamicStrokeWidth] = useState(1.5);
  const [dynamicRadius, setDynamicRadius] = useState(4);

  const svgRef = useRef(null);
  const pointsRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothedProgress = useRef(0);

  useEffect(() => {
    const initialY = 70;
    const segments = 50;
    const segmentLength = width / segments;
    pointsRef.current = Array.from({ length: segments + 1 }, (_, i) => ({
      x: i * segmentLength,
      y: initialY,
    }));
    setEndPoint({ x: width, y: initialY });

    const handleMouseMove = (event) => {
      mousePos.current = { x: event.clientX, y: event.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    let rafId
    const animate = () => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect()
        
        const targetY = mousePos.current.y - svgRect.top;
        const leader = pointsRef.current[pointsRef.current.length - 1];
        const interpolationFactor = 0.05;
        leader.y += (targetY - leader.y) * interpolationFactor;

        const followFactor = 0.5;
        for (let i = pointsRef.current.length - 2; i >= 0; i--) {
          const point = pointsRef.current[i];
          const nextPoint = pointsRef.current[i + 1];
          point.y += (nextPoint.y - point.y) * followFactor;
        }

        // --- THE FIX: Adjust targetX with the container's scroll position ---
        const scrollOffset = scrollerRef?.current?.scrollLeft || 0;
        const targetX = (mousePos.current.x - svgRect.left) + scrollOffset;
        
        const progress = Math.max(0, Math.min(1, targetX / width));

        const smoothingFactor = 0.08;
        smoothedProgress.current += (progress - smoothedProgress.current) * smoothingFactor;

        const maxStrokeWidth = 3;
        const minStrokeWidth = 0.5;
        const maxRadius = 7;
        const minRadius = 2;

        const newStrokeWidth = maxStrokeWidth - (smoothedProgress.current * (maxStrokeWidth - minStrokeWidth));
        const newRadius = maxRadius - (smoothedProgress.current * (maxRadius - minRadius));
        
        setDynamicStrokeWidth(newStrokeWidth);
        setDynamicRadius(newRadius);

        const newPathData = "M " + pointsRef.current.map(p => `${p.x},${p.y}`).join(" L ");
        setPathData(newPathData);
        setEndPoint({ x: leader.x, y: leader.y });
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [width, scrollerRef]) // Add scrollerRef to dependencies

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
      <path
        d={pathData}
        fill="none"
        stroke="black"
        strokeWidth={dynamicStrokeWidth}
        strokeLinecap="round"
        opacity={0.9}
      />
      <circle
        cx={endPoint.x}
        cy={endPoint.y}
        r={dynamicRadius}
        fill="black"
        opacity={0.9}
      />
    </svg>
  )
}

export default AnimatedDottedLine;
