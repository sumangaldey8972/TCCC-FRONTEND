// import * as React from "react"
// import { createMap } from "svg-dotted-map"

// import { cn } from "@/lib/utils"

// interface Marker {
//   lat: number
//   lng: number
//   size?: number
// }

// export interface DottedMapProps extends React.SVGProps<SVGSVGElement> {
//   width?: number
//   height?: number
//   mapSamples?: number
//   markers?: Marker[]
//   dotColor?: string
//   markerColor?: string
//   dotRadius?: number
//   stagger?: boolean
// }

// export function DottedMap({
//   width = 150,
//   height = 75,
//   mapSamples = 5000,
//   markers = [],
//   markerColor = "#FF6900",
//   dotRadius = 0.2,
//   stagger = true,
//   className,
//   style,
// }: DottedMapProps) {
//   const { points, addMarkers } = createMap({
//     width,
//     height,
//     mapSamples,
//   })

//   const processedMarkers = addMarkers(markers)

//   // Compute stagger helpers in a single, simple pass
//   const { xStep, yToRowIndex } = React.useMemo(() => {
//     const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x)
//     const rowMap = new Map<number, number>()
//     let step = 0
//     let prevY = Number.NaN
//     let prevXInRow = Number.NaN

//     for (const p of sorted) {
//       if (p.y !== prevY) {
//         // new row
//         prevY = p.y
//         prevXInRow = Number.NaN
//         if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size)
//       }
//       if (!Number.isNaN(prevXInRow)) {
//         const delta = p.x - prevXInRow
//         if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
//       }
//       prevXInRow = p.x
//     }

//     return { xStep: step || 1, yToRowIndex: rowMap }
//   }, [points])

//   return (
//     <svg
//       viewBox={`0 0 ${width} ${height}`}
//       className={cn("text-gray-500 dark:text-gray-500", className)}
//       style={{ width: "100%", height: "100%", ...style }}
//     >
//       {points.map((point, index) => {
//         const rowIndex = yToRowIndex.get(point.y) ?? 0
//         const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
//         return (
//           <circle
//             cx={point.x + offsetX}
//             cy={point.y}
//             r={dotRadius}
//             fill="currentColor"
//             key={`${point.x}-${point.y}-${index}`}
//           />
//         )
//       })}
//       {processedMarkers.map((marker, index) => {
//         const rowIndex = yToRowIndex.get(marker.y) ?? 0
//         const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
//         return (
//           <circle
//             cx={marker.x + offsetX}
//             cy={marker.y}
//             r={marker.size ?? dotRadius}
//             fill={markerColor}
//             key={`${marker.x}-${marker.y}-${index}`}
//           />
//         )
//       })}
//     </svg>
//   )
// }




"use client"

import * as React from "react"
import { createMap } from "svg-dotted-map"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Marker {
  lat: number
  lng: number
  size?: number
  pulseSpeed?: number
  glow?: boolean
}

export interface DottedMapProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  mapSamples?: number
  markers?: Marker[]
  dotColor?: string
  markerColor?: string
  dotRadius?: number
  stagger?: boolean
  animate?: boolean
  pulseSpeed?: number
  connectionLines?: boolean
  glowEffect?: boolean
  randomizeAnimation?: boolean
  animationIntensity?: number // 0-1
}

export function DottedMap({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  markerColor = "#FF6900",
  dotRadius = 0.2,
  stagger = true,
  animate = true,
  pulseSpeed = 1,
  connectionLines = false,
  glowEffect = true,
  randomizeAnimation = true,
  animationIntensity = 0.3,
  className,
  style,
}: DottedMapProps) {
  const { points, addMarkers } = createMap({
    width,
    height,
    mapSamples,
  })

  const processedMarkers = addMarkers(markers)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  // Compute stagger helpers
  const { xStep, yToRowIndex } = React.useMemo(() => {
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x)
    const rowMap = new Map<number, number>()
    let step = 0
    let prevY = Number.NaN
    let prevXInRow = Number.NaN

    for (const p of sorted) {
      if (p.y !== prevY) {
        prevY = p.y
        prevXInRow = Number.NaN
        if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size)
      }
      if (!Number.isNaN(prevXInRow)) {
        const delta = p.x - prevXInRow
        if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
      }
      prevXInRow = p.x
    }

    return { xStep: step || 1, yToRowIndex: rowMap }
  }, [points])

  // Generate random animation delays for each dot
  const animationDelays = React.useMemo(() => {
    if (!animate || !isClient) return []
    return points.map(() => Math.random() * 2)
  }, [points, animate, isClient])

  // Generate random animation phases for markers
  const markerPhases = React.useMemo(() => {
    if (!animate || !isClient) return []
    return processedMarkers.map((_, i) => ({
      delay: Math.random() * 2,
      speed: markers[i]?.pulseSpeed || pulseSpeed,
    }))
  }, [processedMarkers, markers, pulseSpeed, animate, isClient])

  // Calculate connections between nearby dots
  const connections = React.useMemo(() => {
    if (!connectionLines || !isClient) return []

    const connections: Array<{ x1: number; y1: number; x2: number; y2: number }> = []
    const connectionDistance = Math.min(width, height) * 0.05

    for (let i = 0; i < points.length; i++) {
      const point1 = points[i]
      const rowIndex1 = yToRowIndex.get(point1.y) ?? 0
      const offsetX1 = stagger && rowIndex1 % 2 === 1 ? xStep / 2 : 0

      for (let j = i + 1; j < Math.min(i + 50, points.length); j++) {
        const point2 = points[j]
        const rowIndex2 = yToRowIndex.get(point2.y) ?? 0
        const offsetX2 = stagger && rowIndex2 % 2 === 1 ? xStep / 2 : 0

        const x1 = point1.x + offsetX1
        const y1 = point1.y
        const x2 = point2.x + offsetX2
        const y2 = point2.y

        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

        if (distance < connectionDistance) {
          connections.push({ x1, y1, x2, y2 })
        }
      }
    }

    return connections
  }, [points, yToRowIndex, xStep, stagger, connectionLines, isClient, width, height])

  if (!isClient) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={cn("text-gray-500 dark:text-gray-500", className)}
        style={{ width: "100%", height: "100%", ...style }}
      />
    )
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-gray-500 dark:text-gray-500", className)}
      style={{ width: "100%", height: "100%", ...style }}
    >
      {/* Connection lines between dots */}
      {connectionLines && connections.map((conn, index) => (
        <motion.line
          key={`conn-${index}`}
          x1={conn.x1}
          y1={conn.y1}
          x2={conn.x2}
          y2={conn.y2}
          stroke="currentColor"
          strokeWidth={0.1}
          strokeOpacity={0.1}
          initial={{ strokeOpacity: 0.1 }}
          animate={{
            strokeOpacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            delay: index * 0.01,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Regular dots */}
      {points.map((point, index) => {
        const rowIndex = yToRowIndex.get(point.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
        const delay = randomizeAnimation ? animationDelays[index] : index * 0.01

        return (
          <motion.circle
            cx={point.x + offsetX}
            cy={point.y}
            r={dotRadius}
            fill="currentColor"
            key={`${point.x}-${point.y}-${index}`}
            initial={{
              opacity: 0.5,
              scale: 1
            }}
            animate={
              animate
                ? {
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1 + animationIntensity * 0.2, 1],
                }
                : undefined
            }
            transition={
              animate
                ? {
                  duration: 2 / pulseSpeed,
                  delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }
                : undefined
            }
          />
        )
      })}

      {/* Markers with enhanced animation */}
      {processedMarkers.map((marker, index) => {
        const rowIndex = yToRowIndex.get(marker.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
        const markerData = markers[index] || {}
        const phase = markerPhases[index]
        const speed = markerData.pulseSpeed || pulseSpeed

        return (
          <React.Fragment key={`marker-${marker.x}-${marker.y}-${index}`}>
            {/* Glow effect for markers */}
            {glowEffect && animate && (
              <motion.circle
                cx={marker.x + offsetX}
                cy={marker.y}
                r={(marker.size ?? dotRadius) * 3}
                fill={markerColor}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration: 1.5 / speed,
                  delay: phase?.delay || 0,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Main marker */}
            <motion.circle
              cx={marker.x + offsetX}
              cy={marker.y}
              r={marker.size ?? dotRadius}
              fill={markerColor}
              initial={{
                opacity: 1,
                scale: 1,
              }}
              animate={
                animate
                  ? {
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.2, 1],
                  }
                  : undefined
              }
              transition={
                animate
                  ? {
                    duration: 1 / speed,
                    delay: phase?.delay || 0,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }
                  : undefined
              }
            />

            {/* Inner pulse for markers */}
            {animate && (
              <motion.circle
                cx={marker.x + offsetX}
                cy={marker.y}
                r={(marker.size ?? dotRadius) * 0.5}
                fill="white"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.8 / speed,
                  delay: (phase?.delay || 0) + 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            )}
          </React.Fragment>
        )
      })}
    </svg>
  )
}