import ReactLenis from "lenis/react";
import type { ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        smoothWheel: !prefersReducedMotion,
        syncTouch: true,
        syncTouchLerp: 0.05,
      }}
    >
      {children}
    </ReactLenis>
  );
}
