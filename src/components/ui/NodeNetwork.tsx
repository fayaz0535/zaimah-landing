"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

const NODE_COUNT = 42;
const MAX_DIST = 110;
const MAX_VEL = 0.3;
const RIGHT_BOUNDARY = 0.38; // nodes only spawn in right 62%

function makeNode(canvasWidth: number, canvasHeight: number): Node {
  const xMin = canvasWidth * RIGHT_BOUNDARY;
  return {
    x: xMin + Math.random() * canvasWidth * (1 - RIGHT_BOUNDARY),
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * MAX_VEL * 2,
    vy: (Math.random() - 0.5) * MAX_VEL * 2,
    r: 1.5 + Math.random() * 2.5,
    color: Math.random() > 0.5 ? "#5B5BF6" : "#00C9A7",
  };
}

export default function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => makeNode(width, height));
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!ctx || !canvas) return;
      const isDark = document.documentElement.classList.contains("dark");
      const nodeAlpha = isDark ? 0.73 : 0.4;
      const lineAlphaMax = isDark ? 0.22 : 0.12;

      ctx.clearRect(0, 0, width, height);
      const nodes = nodesRef.current;
      const xMin = width * RIGHT_BOUNDARY;

      // Update + bounce
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < xMin + n.r) { n.x = xMin + n.r; n.vx = Math.abs(n.vx); }
        if (n.x > width - n.r) { n.x = width - n.r; n.vx = -Math.abs(n.vx); }
        if (n.y < n.r)          { n.y = n.r;          n.vy = Math.abs(n.vy); }
        if (n.y > height - n.r) { n.y = height - n.r; n.vy = -Math.abs(n.vy); }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = lineAlphaMax * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(160,155,230,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const hex = n.color === "#5B5BF6" ? "91,91,246" : "0,201,167";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hex},${nodeAlpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
