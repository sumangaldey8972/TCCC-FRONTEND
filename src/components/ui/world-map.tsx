"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
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
  ],
}: MapProps) {
  const { theme } = useTheme();
  const workerRef = useRef<Worker | null>(null);

  const [svgMap, setSvgMap] = useState<string>("");
  const [paths, setPaths] = useState<any[]>([]);

  let lineColor = theme === "light" ? "#0000007c" : "#ffffff65"

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
    <div className={`w-full rounded-lg relative bg-transparent`}>
      {svgMap && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="w-full h-full pointer-events-none select-none"
          alt="world map"
          draggable={true}
        />
      )}

      <svg
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} />
            <stop offset="95%" stopColor={lineColor} />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {paths.map((p, i) => (
          <g key={i}>
            <motion.path
              d={p.path}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.5 }}
            />

            {[p.start, p.end].map((pt: any, idx: number) => (
              <g key={idx}>
                <circle cx={pt.x} cy={pt.y} r="2" fill={lineColor} />
                <circle cx={pt.x} cy={pt.y} r="2" fill={lineColor} opacity="0.5">
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
