"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials"
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
            WHAT CLIENTS SAY
          </p>
          <h2
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: "var(--text-primary)",
              marginBottom: 40,
            }}
          >
            Client Stories
          </h2>
        </motion.div>

        {/* Desktop: 3-col grid | Mobile: horizontal scroll */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            paddingBottom: 8,
          }}
          className="md:grid md:grid-cols-3 md:overflow-visible"
          role="list"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={i}
              variants={cardVariants}
              role="listitem"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-col)",
                borderRadius: 12,
                padding: 22,
                minWidth: 280,
                scrollSnapAlign: "start",
                flexShrink: 0,
              }}
              className="md:min-w-0 md:flex-shrink"
            >
              {/* Stars */}
              <div
                aria-label="5 out of 5 stars"
                role="img"
                style={{ fontSize: 13, color: "#5B5BF6", marginBottom: 12, letterSpacing: 2 }}
              >
                ★★★★★
              </div>

              <blockquote>
                <p
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                    marginBottom: 16,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer>
                  <cite style={{ fontStyle: "normal" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>
                      {t.role}
                    </div>
                  </cite>
                </footer>
              </blockquote>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
