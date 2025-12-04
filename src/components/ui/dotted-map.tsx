"use client";

import { useEffect, useRef, useState } from "react";

export default function DottedMapExtreme({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  markerColor = "#FF6900",
  dotRadius = .1,
}) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // 1. Try load cached version first
    const cacheKey = `dotted-map-${width}-${height}-${mapSamples}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setSvgContent(cached);
      return; // no worker needed
    }

    // 2. Start Web Worker
    workerRef.current = new Worker(
      new URL("../../workers/dottedMap.worker.ts", import.meta.url)
    );

    workerRef.current.onmessage = (e) => {
      const { points, processedMarkers } = e.data;

      // Generate SVG string FAST
      const svg = generateSVG({
        width,
        height,
        points,
        processedMarkers,
        markerColor,
        dotRadius,
      });

      localStorage.setItem(cacheKey, svg);
      setSvgContent(svg);
    };

    workerRef.current.postMessage({
      width,
      height,
      mapSamples,
      markers,
    });

    return () => {
      workerRef.current?.terminate();
    };
  }, [width, height, mapSamples, markers]);

  if (!svgContent) {
    return (
      <div className="w-full h-full animate-pulse bg-black/10 dark:bg-white/10 rounded-lg" />
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      className="w-full h-full"
    />
  );
}


interface SVGGeneratorOptions {
  width: number;
  height: number;
  points: { x: number; y: number }[];
  processedMarkers: { x: number; y: number; size?: number }[];
  markerColor: string;
  dotRadius: number;
}


// ------------ EXTREME FAST SVG STRING GENERATOR --------------
function generateSVG({
  width,
  height,
  points,
  processedMarkers,
  markerColor,
  dotRadius,
}: SVGGeneratorOptions) {
  const pointsStr = points
    .map(
      (p) =>
        `<circle cx="${p.x}" cy="${p.y}" r="${dotRadius}" fill="currentColor"/>`
    )
    .join("");

  const markersStr = processedMarkers
    .map(
      (m) =>
        `<circle cx="${m.x}" cy="${m.y}" r="${m.size ?? dotRadius}" fill="${markerColor}"/>`
    )
    .join("");

  return `<svg viewBox="0 0 ${width} ${height}" style="width:100%;height:100%;">
      ${pointsStr}
      ${markersStr}
    </svg>`;
}
