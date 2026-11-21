"use client";

import { useEffect, useRef } from "react";
import styles from "./PointerSparkles.module.css";

const desktopMouse =
  "(min-width: 1280px) and (any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)";
const sparkleCount = 5;
const sparkleInterval = 80;
const sparkleDistance = 24;

export default function PointerSparkles() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const sparkles = Array.from(layer.children);
    const media = window.matchMedia(desktopMouse);
    let nextSparkle = 0;
    let lastSparkle: { x: number; y: number; time: number } | undefined;

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.buttons !== 0) return;

      const { clientX: x, clientY: y, timeStamp: time } = event;
      if (lastSparkle && (
        time - lastSparkle.time < sparkleInterval ||
        Math.hypot(x - lastSparkle.x, y - lastSparkle.y) < sparkleDistance
      )) return;

      const offset = nextSparkle % 2 === 0 ? -1 : 1;
      sparkles[nextSparkle].animate(
        [
          { transform: `translate(${x + offset * 10}px, ${y + 12}px)`, opacity: 0.72 },
          { transform: `translate(${x + offset * 16}px, ${y + 8}px) scale(.35)`, opacity: 0 },
        ],
        { duration: 390, easing: "ease-out" },
      );
      lastSparkle = { x, y, time };
      nextSparkle = (nextSparkle + 1) % sparkleCount;
    }

    function clearSparkles() {
      lastSparkle = undefined;
      for (const sparkle of sparkles) {
        for (const animation of sparkle.getAnimations()) animation.cancel();
      }
    }

    function stopTracking() {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", clearSparkles);
      clearSparkles();
    }

    function updateTracking() {
      if (media.matches) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("blur", clearSparkles);
      } else {
        stopTracking();
      }
    }

    updateTracking();
    media.addEventListener("change", updateTracking);
    return () => {
      media.removeEventListener("change", updateTracking);
      stopTracking();
    };
  }, []);

  return (
    <div ref={layerRef} className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {Array.from({ length: sparkleCount }, (_, index) => (
        <span key={index} className={styles.sparkle} />
      ))}
    </div>
  );
}
