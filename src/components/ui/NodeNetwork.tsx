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

const NODE_COUNT = 58;
const MAX_DIST   = 130;
const MAX_VEL    = 0.2;

function pickRadius(): number {
  const roll = Math.random();
  if (roll < 0.45) return 1.2 + Math.random() * 1.0;   // tiny  45%: 1.2–2.2
  if (roll < 0.82) return 2.5 + Math.random() * 1.7;   // small 37%: 2.5–4.2
  return 4.5 + Math.random() * 2.5;                      // accent 18%: 4.5–7.0
}

function makeNode(w: number, maxY: number): Node {
  return {
    x:  w * 0.03 + Math.random() * w * 0.94,
    y:  Math.random() * maxY,
    vx: (Math.random() - 0.5) * MAX_VEL * 2,
    vy: (Math.random() - 0.5) * MAX_VEL * 2,
    r:  pickRadius(),
    color: Math.random() > 0.5 ? "#5B5BF6" : "#00C9A7",
  };
}

export default function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef   = useRef<HTMLDivElement>(null);
  const nodesRef  = useRef<Node[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mask   = maskRef.current;
    if (!canvas || !mask) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width  = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    function resize() {
      if (!canvas) return;
      width  = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width  = width;
      canvas.height = height;
      const maxY = height * 0.52;
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => makeNode(width, maxY));
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!ctx || !canvas || !mask) return;
      const isDark = document.documentElement.classList.contains("dark");
      const maxY   = height * 0.52;

      // Sync fade mask gradient to hero bg color
      mask.style.background = isDark
        ? "linear-gradient(to bottom, rgba(6,6,14,0) 0%, rgba(6,6,14,0.82) 58%, #06060E 100%)"
        : "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.82) 58%, #ffffff 100%)";

      ctx.clearRect(0, 0, width, height);
      const nodes = nodesRef.current;

      // Move + bounce
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < n.r)           { n.x = n.r;           n.vx =  Math.abs(n.vx); }
        if (n.x > width - n.r)   { n.x = width - n.r;   n.vx = -Math.abs(n.vx); }
        if (n.y < n.r)           { n.y = n.r;           n.vy =  Math.abs(n.vy); }
        if (n.y > maxY - n.r)    { n.y = maxY - n.r;    n.vy = -Math.abs(n.vy); }
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const yFadeI = Math.max(0, 1 - nodes[i].y / maxY);
            const yFadeJ = Math.max(0, 1 - nodes[j].y / maxY);
            const yFade  = Math.min(yFadeI, yFadeJ);
            const alpha  = 0.26 * (1 - dist / MAX_DIST) * yFade;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(140,135,220,${alpha.toFixed(3)})`;
            ctx.lineWidth   = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const yFade   = Math.max(0, 1 - n.y / maxY);
        const alphaHex = Math.round(yFade * 0x60).toString(16).padStart(2, "0");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}${alphaHex}`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, pointerEvents: "none" }}
        aria-hidden="true"
      />
      <div
        ref={maskRef}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "50%",
          zIndex: 2,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
    </>
  );
}
