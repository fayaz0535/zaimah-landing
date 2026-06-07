"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Discover",
    body: "We research your market and map your exact requirements before writing a line of code.",
  },
  {
    number: 2,
    title: "Design",
    body: "UX-first wireframes reviewed and approved before any development begins.",
  },
  {
    number: 3,
    title: "Build",
    body: "Agile sprints with weekly demos — you see real progress every step of the way.",
  },
  {
    number: 4,
    title: "Launch & Grow",
    body: "Deploy, monitor, and optimise. We stay with you long after go-live.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Process() {
  return (
    <section
      id="process"
      aria-label="Our process"
      style={{
        background: "var(--bg-section-a)",
        padding: "72px 32px",
        borderTop: "1px solid var(--border-col)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5B5BF6",
              marginBottom: 10,
            }}
          >
            HOW WE WORK
          </p>
          <h2
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: "var(--text-primary)",
              marginBottom: 12,
            }}
          >
            Our Process
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: 480,
              marginBottom: 40,
            }}
          >
            Transparent, structured, and built around your outcomes from day one.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 16 }}
          role="list"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              role="listitem"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-col)",
                borderRadius: 12,
                padding: "22px 18px",
                textAlign: "center",
              }}
            >
              {/* Step circle */}
              <div
                aria-label={`Step ${step.number}`}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #5B5BF6, #00C9A7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  {step.number}
                </span>
              </div>

              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
