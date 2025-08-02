"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

export default function LenisProvider({ children }) {
  const lenis = useRef(null);

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
    });

    const raf = (time) => {
      lenis.current.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.current.destroy();
    };
  }, []);

  return children;
}
