"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const NodeNetwork = dynamic(() => import("@/components/ui/NodeNetwork"), { ssr: false });

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55,  } },
};

const stats = [
  { number: "3+",   label: "AI Products"     },
  { number: "50+",  label: "Clients Served"  },
  { number: "24/7", label: "AI Support"      },
  { number: "UAE",  label: "Based"           },
];

export default function Hero() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#FFFFFF",
      }}
    >
      {/* Node network canvas — right 65% only */}
      <NodeNetwork />

      {/* Content — true vertical center, generous left margin */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 600,
          width: "100%",
          paddingLeft: "clamp(28px, 6vw, 80px)",
          paddingRight: 32,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5B5BF6",
            marginBottom: 20,
          }}
        >
          Dubai — AI Technology Company
        </motion.p>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: "clamp(36px, 4.5vw, 72px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: 20,
          }}
        >
          <span style={{ display: "block" }}>
            We Build <span className="gradient-text">Intelligent</span>
          </span>
          <span style={{ display: "block" }}>Technology</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: 420,
            marginBottom: 36,
          }}
        >
          AI-driven software, SaaS products, and digital solutions helping UAE businesses move faster and grow smarter.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}
        >
          <a
            href="#services"
            aria-label="Explore our services"
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              border: "1.5px solid var(--text-primary)",
              color: "var(--text-primary)",
              background: "transparent",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--text-primary)";
              el.style.color = "var(--bg-surface)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.color = "var(--text-primary)";
            }}
          >
            Explore Services
          </a>
          <a
            href="#products"
            aria-label="View our products"
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid var(--border-hover)",
              color: "var(--text-secondary)",
              background: "transparent",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--text-secondary)";
              el.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--border-hover)";
              el.style.color = "var(--text-secondary)";
            }}
          >
            View Products
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          style={{ display: "flex", gap: 24, flexWrap: "wrap" }}
          role="list"
          aria-label="Company statistics"
        >
          {stats.map((s) => (
            <div key={s.label} role="listitem" style={{ textAlign: "center" }}>
              <div
                className="gradient-text"
                style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}
              >
                {s.number}
              </div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.5 } }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "var(--text-muted)" }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
