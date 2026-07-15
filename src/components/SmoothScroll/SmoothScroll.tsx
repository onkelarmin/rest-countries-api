import ReactLenis from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  if (prefersReducedMotion) return children;

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.05,
      }}
    >
      {children}
    </ReactLenis>
  );
}
