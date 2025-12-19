"use client";

import { useEffect, useRef } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const phiRef = useRef(0);
  let width = 0;

  const { theme } = useTheme();
  const rotation = useMotionValue(0);

  const config: COBEOptions = {
    width: 1200,
    height: 1200,
    devicePixelRatio: 2,
    theta: 0.3,
    dark: theme === "light" ? 0 : 1,
    diffuse: 0.4,
    mapSamples: 50000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    markers: [],
    onRender: function (state: Record<string, any>): void {
      throw new Error("Function not implemented.");
    },
    phi: 0
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Resize handling
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    // Init worker
    workerRef.current = new Worker(
      new URL("../../workers/globe.worker.ts", import.meta.url),
      { type: "module" }
    );

    workerRef.current.onmessage = (e) => {
      if (e.data.type === "TICK") {
        phiRef.current = e.data.phi;
        rotation.set(e.data.phi);
      }
    };

    workerRef.current.postMessage({ type: "START" });

    // Init globe
    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        state.phi = rotation.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    canvasRef.current.style.opacity = "1";

    return () => {
      globe.destroy();
      workerRef.current?.postMessage({ type: "STOP" });
      workerRef.current?.terminate();
      window.removeEventListener("resize", onResize);
    };
  }, [theme]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] pointer-events-none select-none",
        className
      )}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
      />
    </div>
  );
}
