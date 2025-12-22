"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
}

export default function WorldMap({
  dots = [
    {
      start: {
        lat: 64.2008,
        lng: -149.4937,
      }, // Alaska (Fairbanks)
      end: {
        lat: 34.0522,
        lng: -118.2437,
      }, // Los Angeles
    },
    {
      start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
      end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
    },
    {
      start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
      end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
    },
    {
      start: { lat: 51.5074, lng: -0.1278 }, // London
      end: { lat: 28.6139, lng: 77.209 }, // New Delhi
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
      end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
      end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
    },
  ]

}: MapProps) {
  const { theme } = useTheme();
  const workerRef = useRef<Worker | null>(null);

  const [svgMap, setSvgMap] = useState<string>("");
  const [paths, setPaths] = useState<any[]>([]);

  let lineColor = theme === "light" ? "#000000ff" : "#ffffffff";

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("@/workers/worldMap.worker.ts", import.meta.url)
    );

    workerRef.current.postMessage({ theme, dots });

    workerRef.current.onmessage = (e) => {
      setSvgMap(e.data.svgMap);
      setPaths(e.data.paths);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [theme, dots]);

  return (
    <div className={`w-full rounded-lg relative bg-transparent overflow-hidden`}>
      {svgMap && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="w-full h-full pointer-events-none select-none"
          alt="world map"
          draggable={false}
        />
      )}

      <svg
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          {/* Single clean network beam */}
          <linearGradient id="clean-beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="20%" stopColor={lineColor} stopOpacity="0.7" />
            <stop offset="80%" stopColor={lineColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {paths.map((p, i) => (
          <g key={i}>
            {/* Base network line - very faint */}
            <path
              d={p.path}
              fill="none"
              stroke={lineColor}
              strokeWidth="0.3"
              strokeOpacity="0.08"
            />

            {/* Long thin network data beam */}
            <motion.path
              d={p.path}
              fill="none"
              stroke="url(#clean-beam)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{
                strokeDasharray: "150 600",
                strokeDashoffset: 0
              }}
              animate={{
                strokeDashoffset: [0, -750],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1,
              }}
            />

            {/* Simple network nodes */}
            <circle
              cx={p.start.x}
              cy={p.start.y}
              r="1.5"
              fill={lineColor}
              fillOpacity="0.6"
            />

            <circle
              cx={p.end.x}
              cy={p.end.y}
              r="1.5"
              fill={lineColor}
              fillOpacity="0.6"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}