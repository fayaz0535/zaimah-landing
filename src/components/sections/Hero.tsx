"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Brain, Laptop, BarChart2, Megaphone } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/ui/ThemeProvider";

const NodeNetwork = dynamic(() => import("@/components/ui/NodeNetwork"), { ssr: false });

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const miniCards = [
  { title: "AI Development",    desc: "Custom AI apps & automation",  accent: "indigo" as const, Icon: Brain     },
  { title: "SaaS Products",     desc: "Purpose-built UAE SaaS",        accent: "teal"   as const, Icon: Laptop    },
  { title: "IT Consulting",     desc: "Strategy to deployment",         accent: "indigo" as const, Icon: BarChart2 },
  { title: "Digital Marketing", desc: "SEO, content & AI growth",       accent: "teal"   as const, Icon: Megaphone },
];

const stats = [
  { number: "3+",   label: "AI Products Built" },
  { number: "50+",  label: "Clients Served"    },
  { number: "24/7", label: "AI Support"        },
  { number: "UAE",  label: "Based in Dubai"    },
];

export default function Hero() {
  const { theme } = useTheme();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cardBg      = theme === "dark" ? "rgba(255,255,255,0.03)" : "var(--bg-surface)";
  const heroBg      = theme === "dark" ? "#06060E" : "#FFFFFF";

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
        alignItems: "center",
        justifyContent: "center",
        background: heroBg,
        paddingTop: 0,
        marginTop: 0,
      }}
    >
      {/* Canvas + fade mask */}
      <NodeNetwork />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          maxWidth: 660,
          width: "100%",
          paddingLeft: "clamp(24px, 6vw, 80px)",
          paddingRight: "clamp(24px, 6vw, 80px)",
        }}
      >
        {/* Location badge */}
        <motion.div variants={itemVariants} style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 10,
              fontWeight: 600,
              color: "#5B5BF6",
              background: "rgba(91,91,246,0.08)",
              border: "1px solid rgba(91,91,246,0.2)",
              borderRadius: 20,
              padding: "6px 14px",
            }}
          >
            📍 Dubai, UAE — AI Technology Company
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: "clamp(36px, 4.5vw, 64px)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: 20,
          }}
        >
          <span style={{ display: "block", whiteSpace: "nowrap" }}>
            We Build{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #5B5BF6, #00C9A7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Intelligent
            </span>
          </span>
          <span style={{ display: "block" }}>Technology</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            maxWidth: 520,
            margin: "0 auto 32px",
          }}
        >
          AI-driven software, SaaS products, and digital solutions helping UAE
          businesses move faster, qualify leads, and grow smarter.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}
        >
          <a
            href="#services"
            aria-label="Explore our services"
            style={{
              padding: "12px 24px",
              borderRadius: 9,
              fontSize: 13,
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
              padding: "12px 24px",
              borderRadius: 9,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid var(--border-hover)",
              color: "var(--text-muted)",
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
              el.style.color = "var(--text-muted)";
            }}
          >
            View Products
          </a>
        </motion.div>

        {/* Mini service cards — 2-col mobile, 4-col desktop */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4"
          style={{ gap: 10, maxWidth: 680, margin: "0 auto 32px" }}
          role="list"
          aria-label="Key services"
        >
          {miniCards.map((card) => {
            const isIndigo    = card.accent === "indigo";
            const accentColor = isIndigo ? "#5B5BF6" : "#00C9A7";
            const accentBg    = isIndigo ? "rgba(91,91,246,0.09)" : "rgba(0,201,167,0.09)";
            return (
              <div
                key={card.title}
                role="listitem"
                style={{
                  background: cardBg,
                  border: "1px solid var(--border-col)",
                  borderRadius: 12,
                  padding: "17px 14px",
                  textAlign: "center",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: accentBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                  }}
                >
                  <card.Icon size={16} color={accentColor} strokeWidth={1.75} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.45 }}>
                  {card.desc}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            gap: 48,
            justifyContent: "center",
            flexWrap: "wrap",
            paddingTop: 26,
            borderTop: "1px solid var(--border-col)",
            maxWidth: 580,
            margin: "0 auto",
          }}
          role="list"
          aria-label="Company statistics"
        >
          {stats.map((s) => (
            <div key={s.label} role="listitem" style={{ textAlign: "center" }}>
              <div
                className="gradient-text"
                style={{ fontSize: 24, fontWeight: 700, lineHeight: 1 }}
              >
                {s.number}
              </div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 5 }}>
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
              zIndex: 3,
            }}
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "var(--text-muted)" }}
            >
              <ChevronDown size={22} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
