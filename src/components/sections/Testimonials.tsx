"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5,  } },
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials"
      style={{ background: "var(--bg-surface)", padding: "80px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <p
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5B5BF6",
            marginBottom: 12,
          }}
        >
          What Clients Say
        </p>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.015em",
            color: "var(--text-primary)",
            marginBottom: 40,
          }}
        >
          Client Stories
        </h2>

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
                background: "var(--bg-page)",
                border: "1px solid var(--border-col)",
                borderRadius: 12,
                padding: 20,
                minWidth: 280,
                scrollSnapAlign: "start",
                flexShrink: 0,
              }}
              className="md:min-w-0 md:flex-shrink"
            >
              {/* Stars */}
              <div
                aria-label="5 out of 5 stars"
                style={{
                  fontSize: 14,
                  color: "#5B5BF6",
                  marginBottom: 12,
                  letterSpacing: 2,
                }}
                role="img"
              >
                ★★★★★
              </div>

              <blockquote>
                <p
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: 14,
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
