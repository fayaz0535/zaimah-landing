"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { target: 3,  suffix: "+",   label: "AI Products Built", isText: false },
  { target: 50, suffix: "+",   label: "Clients Served",    isText: false },
  { target: 0,  suffix: "UAE", label: "Headquarters",      isText: true  },
  { target: 0,  suffix: "24/7",label: "AI Support",        isText: true  },
];

const checklist = [
  "Deep expertise in AI, SaaS, and enterprise software",
  "UAE-first thinking — we understand your market",
  "Full-stack from strategy to deployment",
  "Long-term partnership, not one-off projects",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <section
      id="about"
      aria-label="About ZAIMAH TECHNOLOGIES"
      style={{
        background: "var(--bg-section-b)",
        padding: "72px 32px",
        borderTop: "1px solid var(--border-col)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gap: 48,
          alignItems: "center",
        }}
        className="grid-cols-1 lg:grid-cols-2"
      >
        {/* Left col — copy + checklist */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5B5BF6",
              marginBottom: 10,
            }}
          >
            ABOUT US
          </motion.p>

          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              color: "var(--text-primary)",
              marginBottom: 20,
            }}
          >
            Think Forward.{" "}
            <span className="gradient-text">Build Different.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.85,
              marginBottom: 24,
            }}
          >
            ZAIMAH TECHNOLOGIES is a Dubai-based technology company founded to bridge
            the gap between cutting-edge AI and real-world business needs. We build
            intelligent software and deliver technology services that give UAE businesses
            a genuine competitive edge.
          </motion.p>

          {/* Checklist */}
          <motion.ul
            variants={containerVariants}
            style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}
          >
            {checklist.map((item) => (
              <motion.li
                key={item}
                variants={itemVariants}
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#5B5BF6",
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
                <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right col — 2x2 stat cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
          role="list"
          aria-label="Company statistics"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              role="listitem"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-col)",
                borderRadius: 12,
                padding: 22,
                textAlign: "center",
              }}
            >
              <AnimatedCounter
                target={s.target}
                suffix={s.suffix}
                isText={s.isText}
                fontSize={28}
              />
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
