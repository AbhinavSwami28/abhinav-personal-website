"use client";

import { useEffect, useRef, useCallback } from "react";
import { Flashlight, X } from "lucide-react";

interface FlashlightModeProps {
  active: boolean;
  onExit: () => void;
}

export default function FlashlightMode({ active, onExit }: FlashlightModeProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    posRef.current = { x: clientX, y: clientY };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--spot-x", `${posRef.current.x}px`);
        overlayRef.current.style.setProperty("--spot-y", `${posRef.current.y}px`);
      }
    });
  }, []);

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Set initial position to center of viewport
    updatePosition(window.innerWidth / 2, window.innerHeight / 2);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, updatePosition]);

  if (!active) return null;

  return (
    <>
      {/* The dark overlay with a spotlight hole */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            circle 140px at var(--spot-x, 50%) var(--spot-y, 50%),
            transparent 0%,
            transparent 60%,
            rgba(0, 0, 0, 0.92) 100%
          )`,
          // @ts-expect-error -- CSS custom properties
          "--spot-x": "-1000px",
          "--spot-y": "-1000px",
        }}
      />

      {/* Glow effect around the spotlight */}
      <div
        className="fixed inset-0 z-[9997] pointer-events-none"
        style={{
          background: `radial-gradient(
            circle 160px at var(--spot-x, 50%) var(--spot-y, 50%),
            rgba(251, 191, 36, 0.06) 0%,
            transparent 100%
          )`,
          // @ts-expect-error -- CSS custom properties
          "--spot-x": overlayRef.current?.style.getPropertyValue("--spot-x") || "-1000px",
          "--spot-y": overlayRef.current?.style.getPropertyValue("--spot-y") || "-1000px",
        }}
      />

      {/* Exit button — always visible and clickable */}
      <button
        onClick={onExit}
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500 text-black font-medium shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-colors pointer-events-auto"
        aria-label="Exit Real Dark Mode"
      >
        <Flashlight size={16} />
        <span className="text-sm">Exit Flashlight</span>
        <X size={14} />
      </button>
    </>
  );
}
