"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  target: number;
  suffix?: string;
  duration?: number;
  isText?: boolean;
}

export default function AnimatedCounter({ target, suffix = "", duration = 1800, isText = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current || isText) return;
    hasStarted.current = true;

    const start = performance.now();
    const raf = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [isInView, target, duration, isText]);

  if (isText) {
    return (
      <span ref={ref} className="gradient-text" style={{ fontSize: 22, fontWeight: 700 }}>
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className="gradient-text" style={{ fontSize: 22, fontWeight: 700 }}>
      {value}{suffix}
    </span>
  );
}
