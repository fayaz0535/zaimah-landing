"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain, BarChart2, Laptop, Server, GraduationCap, Megaphone,
  ArrowRight, ChevronDown, Mail, MapPin, Clock,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─────────────────────────────────────────────────────────────
// 1. Canvas hero
// ─────────────────────────────────────────────────────────────

type RGB = [number, number, number];
const IND: RGB = [91,  111, 212];
const TEA: RGB = [78,  207, 179];
const LAV: RGB = [176, 174, 230];
const COLS: RGB[] = [IND, TEA, LAV];

interface CNode {
  x: number; y: number;
  vx: number; vy: number;
  r: number; color: RGB; phase: number;
}

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef  = useRef<CNode[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, t = 0;

    function resize() {
      if (!canvas) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;

      const TOP = H * 0.5;
      const CX  = W / 2;
      const CY  = H / 2;
      const TRX = W * 0.28;
      const TRY = 148;

      function inZone(x: number, y: number, pad: number): boolean {
        const dx = x - CX, dy = y - CY;
        return (dx * dx) / ((TRX + pad) * (TRX + pad)) + (dy * dy) / ((TRY + pad) * (TRY + pad)) < 1;
      }

      function spawn(): { x: number; y: number } {
        let x = 0, y = 0, attempts = 0;
        do {
          const zone = Math.floor(Math.random() * 4);
          if (zone === 0) {
            x = 6 + Math.random() * (W * 0.2);
            y = 6 + Math.random() * (TOP - 10);
          } else if (zone === 1) {
            x = W * 0.8 + Math.random() * (W * 0.2 - 6);
            y = 6 + Math.random() * (TOP - 10);
          } else if (zone === 2) {
            x = 6 + Math.random() * (W - 12);
            y = 6 + Math.random() * (TOP * 0.3);
          } else {
            x = 6 + Math.random() * (W - 12);
            y = TOP * 0.75 + Math.random() * (TOP * 0.22);
          }
          attempts++;
        } while (inZone(x, y, 32) && attempts < 60);
        return { x, y };
      }

      nodesRef.current = Array.from({ length: 65 }, () => {
        const { x, y } = spawn();
        return {
          x, y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 1.5 + Math.random() * 3,
          color: COLS[Math.floor(Math.random() * 3)],
          phase: Math.random() * Math.PI * 2,
        };
      });
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!ctx) return;
      t += 0.016;
      const TOP = H * 0.5;
      const CX  = W / 2;
      const CY  = H / 2;
      const RX  = W * 0.28;
      const RY  = 148;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark"
        || window.matchMedia("(prefers-color-scheme: dark)").matches;
      ctx.fillStyle = isDark ? "#0F0F1A" : "#ffffff";
      ctx.fillRect(0, 0, W, H);

      const nodes = nodesRef.current;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < n.r)       { n.x = n.r;       n.vx =  Math.abs(n.vx); }
        if (n.x > W - n.r)   { n.x = W - n.r;   n.vx = -Math.abs(n.vx); }
        if (n.y < n.r)       { n.y = n.r;        n.vy =  Math.abs(n.vy); }
        if (n.y > TOP - n.r) { n.y = TOP - n.r;  n.vy = -Math.abs(n.vy); }

        const edx = n.x - CX;
        const edy = n.y - CY;
        const ev  = (edx * edx) / (RX * RX) + (edy * edy) / (RY * RY);
        if (ev < 1.2) {
          const dist = Math.sqrt(edx * edx + edy * edy) || 1;
          const force = (1.2 - ev) * 0.9;
          n.vx += (edx / dist) * force;
          n.vy += (edy / dist) * force;
          const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (spd > 0.6) { n.vx = (n.vx / spd) * 0.6; n.vy = (n.vy / spd) * 0.6; }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(140,135,220,${((1 - d / 90) * 0.13).toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = n.r * (1 + 0.07 * Math.sin(t * 1.3 + n.phase));
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color[0]},${n.color[1]},${n.color[2]},0.65)`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none", display: "block" }}
      aria-hidden="true"
    />
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Services data
// ─────────────────────────────────────────────────────────────

const SERVICES = [
  { title: "AI-Driven Development",  desc: "Custom AI apps and automation from intelligent pipelines to decision-support systems.", accent: "indigo" as const, Icon: Brain },
  { title: "IT Consulting",          desc: "Strategic advisory to modernise infrastructure, optimise processes, and scale.", accent: "teal"   as const, Icon: BarChart2 },
  { title: "SaaS Products",          desc: "Purpose-built software for UAE businesses — starting with funnl and SprintX.", accent: "indigo" as const, Icon: Laptop },
  { title: "Web & Hosting",          desc: "High-performance web development and managed hosting optimised for the UAE market.", accent: "teal"   as const, Icon: Server },
  { title: "Online Training",        desc: "Industry-focused technology training delivered online at your own pace.", accent: "indigo" as const, Icon: GraduationCap },
  { title: "Digital Marketing",      desc: "SEO, content and AI growth tools to generate qualified leads across the UAE.", accent: "teal"   as const, Icon: Megaphone },
];

// ─────────────────────────────────────────────────────────────
// 3. Contact form
// ─────────────────────────────────────────────────────────────

const INTERESTS = [
  "AI-Driven Development",
  "IT Consulting",
  "SaaS Products",
  "Web & Hosting Services",
  "Online Training",
  "Digital Marketing",
  "Other",
];

type SubmitState = "idle" | "error" | "success";

function ContactForm() {
  const [form, setForm]          = useState({ name: "", email: "", interest: "" });
  const [submitState, setSubmit] = useState<SubmitState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.interest) {
      setSubmit("error");
      setTimeout(() => setSubmit("idle"), 2000);
      return;
    }
    setSubmit("success");
    setTimeout(() => { setSubmit("idle"); setForm({ name: "", email: "", interest: "" }); }, 3000);
  }

  const base: React.CSSProperties = {
    width: "100%", padding: "11px 13px", fontSize: 12,
    background: "var(--bg-input)", border: "0.5px solid var(--border-input)",
    borderRadius: 9, color: "var(--ink)", outline: "none",
    fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s",
  };
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#5B6FD4";
    e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(91,111,212,0.08)";
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--border-input)";
    e.currentTarget.style.boxShadow   = "none";
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="c-name" style={{ display: "block", fontSize: 11, color: "var(--ink-faint)", marginBottom: 6 }}>Full Name</label>
        <input id="c-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" style={base} onFocus={focus} onBlur={blur} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="c-email" style={{ display: "block", fontSize: 11, color: "var(--ink-faint)", marginBottom: 6 }}>Email Address</label>
        <input id="c-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.ae" style={base} onFocus={focus} onBlur={blur} />
      </div>
      <div style={{ marginBottom: 20, position: "relative" }}>
        <label htmlFor="c-interest" style={{ display: "block", fontSize: 11, color: "var(--ink-faint)", marginBottom: 6 }}>I&apos;m interested in…</label>
        <div style={{ position: "relative" }}>
          <select
            id="c-interest" name="interest"
            value={form.interest} onChange={handleChange}
            style={{ ...base, WebkitAppearance: "none", appearance: "none", cursor: "pointer", paddingRight: 36 }}
            onFocus={focus} onBlur={blur}
          >
            <option value="">Select a service…</option>
            {INTERESTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <svg aria-hidden="true" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--ink-faint)" }} width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <button
        type="submit"
        style={{
          width: "100%", padding: "13px 0", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, transition: "background 0.2s", color: "#fff",
          background: submitState === "success" ? "#10B981" : submitState === "error" ? "#EF4444" : "linear-gradient(90deg, #5B6FD4, #4ECFB3)",
        }}
      >
        {submitState === "success" ? "Message sent! We'll be in touch ✓" : submitState === "error" ? "Please fill in all fields" : "Send Message →"}
      </button>
      <p style={{ fontSize: 10, color: "var(--ink-hint)", textAlign: "center", marginTop: 12 }}>No spam. We only reach out about your enquiry.</p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. Main page
// ─────────────────────────────────────────────────────────────

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Home() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const target = sessionStorage.getItem('scrollTo');
    if (target) {
      sessionStorage.removeItem('scrollTo');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── HERO ────────────────────────────────────────── */}
        <section
          id="home"
          aria-label="Hero"
          style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}
        >
          <HeroCanvas />

          <div
            style={{ position: "relative", zIndex: 3, textAlign: "center", maxWidth: 660, width: "100%", paddingLeft: "clamp(24px, 6vw, 80px)", paddingRight: "clamp(24px, 6vw, 80px)" }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            >
              {/* Location badge */}
              <motion.div variants={fade} style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 600, color: "#5B6FD4", background: "rgba(91,111,212,0.07)", border: "1px solid rgba(91,111,212,0.18)", borderRadius: 20, padding: "6px 14px" }}>
                  📍 Dubai, UAE — AI Technology Company
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={fade}
                style={{ fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 20 }}
              >
                <span style={{ display: "block", whiteSpace: "nowrap" }}>
                  We Build{" "}<span style={{ color: "#5B6FD4" }}>Intelligent</span>
                </span>
                <span style={{ display: "block", color: "#4ECFB3" }}>Technology</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fade}
                style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 32px" }}
              >
                We design and ship AI-powered software, SaaS platforms, and digital
                solutions — engineered for growth-minded businesses in the UAE and beyond.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={fade}
                style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}
              >
                <a
                  href="#services"
                  style={{ padding: "12px 24px", borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: "none", border: "1.5px solid var(--ink)", color: "var(--ink)", background: "transparent", transition: "background 0.2s, color 0.2s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "var(--ink)"; el.style.color = "var(--bg-primary)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--ink)"; }}
                >
                  Explore Services
                </a>
                <a
                  href="#products"
                  style={{ padding: "12px 24px", borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: "none", border: "1px solid var(--border)", color: "var(--ink-mid)", background: "transparent", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--ink-mid)"; el.style.color = "var(--ink)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--border)"; el.style.color = "var(--ink-mid)"; }}
                >
                  View Products
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fade}
                style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", paddingTop: 26, borderTop: "1px solid var(--border)", maxWidth: 560, margin: "0 auto" }}
              >
                {[
                  { n: "3+",   l: "AI Products Built" },
                  { n: "50+",  l: "Clients Served" },
                  { n: "24/7", l: "AI Support" },
                  { n: "UAE",  l: "Based in Dubai" },
                ].map((s) => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, background: "linear-gradient(90deg, #5B6FD4, #4ECFB3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 5 }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {showScroll && (
            <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 3, color: "var(--ink-faint)" }} aria-hidden="true">
              <ChevronDown size={22} />
            </div>
          )}
        </section>

        {/* ── UAE AI STRIP ─────────────────────────────────── */}
        <div
          aria-label="UAE AI credentials"
          style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(16px, 4vw, 48px)", flexWrap: "wrap" }}
        >
          {["🇦🇪  UAE AI Vision 2031 Aligned", "🏢  SHAMS FZE Registered", "🤖  WhatsApp Business API Certified", "🔒  PDPA Compliant"].map((item) => (
            <span key={item} style={{ fontSize: 11, fontWeight: 500, color: "var(--ink-mid)", whiteSpace: "nowrap" }}>{item}</span>
          ))}
        </div>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section
          id="services"
          aria-label="Our services"
          style={{ background: "var(--bg-primary)", padding: "72px 32px", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B6FD4", marginBottom: 10 }}>WHAT WE DO</p>
              <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--ink)", marginBottom: 12 }}>Our Services</h2>
              <p style={{ fontSize: 13, color: "var(--ink-mid)", lineHeight: 1.75, maxWidth: 500, marginBottom: 40 }}>
                End-to-end technology solutions built specifically for the UAE market — from AI development to digital marketing.
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}
            >
              {SERVICES.map((s) => {
                const isInd = s.accent === "indigo";
                const ac    = isInd ? "#5B6FD4" : "#4ECFB3";
                const acBg  = isInd ? "rgba(91,111,212,0.08)" : "rgba(78,207,179,0.08)";
                return (
                  <motion.article
                    key={s.title} variants={fade}
                    style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", borderRadius: 12, padding: 20, transition: "box-shadow 0.25s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <div aria-hidden="true" style={{ width: 36, height: 36, borderRadius: 9, background: acBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      <s.Icon size={18} color={ac} strokeWidth={1.75} />
                    </div>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: 12 }}>{s.desc}</p>
                    <a
                      href="#contact"
                      style={{ fontSize: 11, fontWeight: 600, color: "#5B6FD4", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                    >
                      Learn more <ArrowRight size={11} />
                    </a>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────── */}
        <section
          id="products"
          aria-label="Our products"
          style={{ background: "var(--bg-alt)", padding: "72px 32px", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
              <p className="eyebrow teal">Our products</p>
              <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--ink)", marginBottom: 12 }}>
                Two AI platforms.<br />One obsession: your results.
              </h2>
              <p className="section-lead">
                We don&apos;t consult — we ship. funnl and SprintX are live,
                solving real problems for UAE businesses right now.
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>

              {/* funnl */}
              <motion.article
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}
                aria-label="funnl product"
                className="product-card teal-accent"
              >
                <span className="product-tag teal-tag">AI customer acquisition</span>
                <h3 className="product-name">funnl</h3>
                <p className="product-sub">
                  The AI agent that turns WhatsApp conversations into booked
                  appointments — without a single human touch.
                </p>
                <ul className="product-features">
                  <li><span className="feat-dot teal-dot" />Fatimah AI agent qualifies leads &amp; books 24/7 on WhatsApp</li>
                  <li><span className="feat-dot teal-dot" />Handles reschedules, follow-ups and reminders automatically</li>
                  <li><span className="feat-dot teal-dot" />Live availability-aware booking with staff assignment</li>
                  <li><span className="feat-dot teal-dot" />Marketing campaigns + real-time analytics dashboard</li>
                </ul>
                <p className="product-for">Salons · clinics · real estate · gyms · home services</p>
                <a href="https://funnl.zaimahtech.ae" className="product-cta teal-cta">
                  Visit funnl →
                </a>
              </motion.article>

              {/* SprintX */}
              <motion.article
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}
                aria-label="SprintX product"
                className="product-card indigo-accent"
              >
                <span className="product-tag indigo-tag">AI agile delivery</span>
                <h3 className="product-name">SprintX</h3>
                <p className="product-sub">
                  Your engineering team&apos;s AI co-pilot. Takes a feature request and
                  returns working, reviewed code — end to end.
                </p>
                <ul className="product-features">
                  <li><span className="feat-dot indigo-dot" />9 AI agents — PO, Architect, Developer, QA, Security, DevOps</li>
                  <li><span className="feat-dot indigo-dot" />Natural language → full SDLC: stories, code, tests, PRs</li>
                  <li><span className="feat-dot indigo-dot" />GitHub integration — auto-opens PRs to your repository</li>
                  <li><span className="feat-dot indigo-dot" />LangGraph orchestration for auditable multi-agent reasoning</li>
                </ul>
                <p className="product-for">Engineering teams · CTOs · product leaders · scale-ups</p>
                <a href="https://sprintx.zaimahtech.ae" className="product-cta indigo-cta">
                  Request early access →
                </a>
              </motion.article>
            </div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────── */}
        <section
          id="about"
          aria-label="About ZAIMAH Technologies"
          style={{ background: "var(--bg-primary)", padding: "72px 32px", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
            {/* Left */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.p variants={fade} style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B6FD4", marginBottom: 10 }}>
                ABOUT US
              </motion.p>
              <motion.h2 variants={fade} style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.015em", color: "var(--ink)", marginBottom: 20 }}>
                Think Forward.{" "}
                <span style={{ background: "linear-gradient(90deg, #5B6FD4, #4ECFB3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Build Different.
                </span>
              </motion.h2>
              <motion.p variants={fade} style={{ fontSize: 13, color: "var(--ink-mid)", lineHeight: 1.85, marginBottom: 24 }}>
                ZAIMAH Technologies is a Dubai-based technology company founded to bridge the gap
                between cutting-edge AI and real-world business needs. We build intelligent software
                and deliver technology services that give UAE businesses a genuine competitive edge.
              </motion.p>
              <motion.ul
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  "Deep expertise in AI, SaaS, and enterprise software",
                  "UAE-first thinking — we understand your market",
                  "Full-stack from strategy to deployment",
                  "Long-term partnership, not one-off projects",
                ].map((item) => (
                  <motion.li key={item} variants={fade} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "#5B6FD4", flexShrink: 0, marginTop: 5 }} />
                    <span style={{ fontSize: 13, color: "var(--ink-mid)", lineHeight: 1.6 }}>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Right — 2×2 stat cards */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
              role="list" aria-label="Company statistics"
            >
              {[
                { n: "20+",     l: "Years enterprise technology",  fz: 28 },
                { n: "2",       l: "Live AI SaaS platforms",       fz: 28 },
                { n: "9",       l: "AI agents in SprintX",         fz: 28 },
                { n: "Golden\nVisa", l: "UAE · SHAMS FZE",         fz: 16 },
              ].map((s) => (
                <motion.div
                  key={s.l} variants={fade} role="listitem"
                  style={{ background: "var(--bg-alt)", border: "0.5px solid var(--border)", borderRadius: 12, padding: 22, textAlign: "center" }}
                >
                  <div style={{ fontSize: s.fz, fontWeight: 700, background: "linear-gradient(90deg, #5B6FD4, #4ECFB3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2, marginBottom: 8, whiteSpace: "pre-line" }}>
                    {s.n}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <section
          id="contact"
          aria-label="Contact us"
          style={{ background: "var(--bg-alt)", padding: "72px 32px", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>
            {/* Left */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B6FD4", marginBottom: 10 }}>GET IN TOUCH</p>
              <h2 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.15, color: "var(--ink)", marginBottom: 16 }}>
                Let&apos;s Build<br />
                <span style={{ background: "linear-gradient(90deg, #5B6FD4, #4ECFB3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Something Great</span>
                <br />Together
              </h2>
              <p style={{ fontSize: 13, color: "var(--ink-mid)", lineHeight: 1.8, marginBottom: 28, maxWidth: 380 }}>
                Whether you have a project in mind, want to explore our services, or simply
                want to learn more — we respond fast and we mean it.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {[
                  { Icon: Mail,   label: "Email us directly", value: "fayaz@zaimahtech.ae",    href: "mailto:fayaz@zaimahtech.ae", ac: "#5B6FD4", acBg: "rgba(91,111,212,0.08)" },
                  { Icon: MapPin, label: "Find us",           value: "Dubai, UAE",              href: null,                         ac: "#4ECFB3", acBg: "rgba(78,207,179,0.08)"  },
                  { Icon: Clock,  label: "Working hours",     value: "Mon–Fri, 9am–6pm GST",   href: null,                         ac: "#5B6FD4", acBg: "rgba(91,111,212,0.08)" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", borderRadius: 11, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                    <div aria-hidden="true" style={{ width: 36, height: 36, borderRadius: 9, background: item.acBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <item.Icon size={15} color={item.ac} strokeWidth={1.75} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "var(--ink-faint)", marginBottom: 2 }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>{item.value}</a>
                      ) : (
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--teal-light)", border: "1px solid rgba(78,207,179,0.2)", borderRadius: 10, padding: "10px 16px" }}>
                <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ECFB3", flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: "var(--teal-dark)" }}>We typically respond within 24 hours</span>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}
              style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", borderRadius: 16, padding: 28 }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Send us a message</h3>
              <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 22 }}>Fill in the form and we&apos;ll be in touch shortly.</p>
              <ContactForm />
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
