"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { target: 3, suffix: "+", label: "AI Products Built" },
  { target: 50, suffix: "+", label: "Clients Served" },
  { target: 0, suffix: "UAE", label: "Based", isText: true },
  { target: 0, suffix: "24/7", label: "AI Support", isText: true },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5,  } },
};

export default function About() {
  return (
    <section
      id="about"
      aria-label="About ZAIMAH TECHNOLOGIES"
      style={{ background: "var(--bg-page)", padding: "80px 0" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Left — copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5B5BF6",
              marginBottom: 12,
            }}
          >
            About Us
          </motion.p>

          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: "var(--text-primary)",
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            Think Forward.{" "}
            <span className="gradient-text">Build Different.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            ZAIMAH TECHNOLOGIES is a Dubai-based technology company founded to
            bridge the gap between cutting-edge AI and real-world business needs.
            We build intelligent software products and deliver technology services
            that give UAE businesses a genuine competitive edge.
          </motion.p>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginTop: 16,
            }}
          >
            Every product we ship is built for the Gulf market — bilingual by
            default, compliant by design, and fast enough to keep up with how
            business moves in the UAE.
          </motion.p>
        </motion.div>

        {/* Right — stat cards */}
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
                borderRadius: 10,
                padding: 16,
                textAlign: "center",
              }}
            >
              <AnimatedCounter
                target={s.target}
                suffix={s.suffix}
                isText={s.isText}
              />
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
