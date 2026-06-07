"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const sectionVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function FunnlCard() {
  return (
    <motion.article
      variants={sectionVariants}
      style={{ position: "relative" }}
      aria-label="funnl product"
    >
      {/* Gradient border wrapper */}
      <div
        style={{
          background: "linear-gradient(135deg, #5B5BF6, #00C9A7)",
          borderRadius: 15,
          padding: 2,
        }}
      >
        <div
          style={{
            background: "var(--bg-surface)",
            borderRadius: 13,
            padding: 24,
            position: "relative",
            height: "100%",
          }}
        >
          {/* FEATURED badge */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#5B5BF6",
              background: "rgba(91,91,246,0.1)",
              padding: "4px 8px",
              borderRadius: 4,
            }}
          >
            Featured
          </div>

          {/* Name */}
          <h3
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            funnl
          </h3>
          <p
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#00C9A7",
              marginBottom: 16,
            }}
          >
            CAPTURE. QUALIFY. CONVERT.
          </p>

          <p
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: 20,
            }}
          >
            AI-powered lead generation and appointment booking SaaS for UAE SMEs.
            WhatsApp-native, bilingual, and fully autonomous — it qualifies leads,
            books appointments, and follows up without a human in the loop.
          </p>

          <ul
            style={{
              listStyle: "none",
              marginBottom: 24,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {[
              "WhatsApp AI conversations 24/7",
              "Automatic lead qualification",
              "Smart appointment booking",
              "Multi-sector AI personas",
            ].map((feat) => (
              <li
                key={feat}
                style={{
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <span style={{ color: "#00C9A7", marginTop: 1, flexShrink: 0 }}>✓</span>
                {feat}
              </li>
            ))}
          </ul>

          <a
            href="https://funnl.zaimahtech.ae"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit funnl — opens in new tab"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: "#5B5BF6",
              textDecoration: "none",
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "10px")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "6px")}
          >
            Visit funnl <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function SprintXCard() {
  const [email, setEmail] = useState("");

  return (
    <motion.article
      variants={sectionVariants}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-col)",
        borderRadius: 14,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: 320,
        gap: 16,
      }}
      aria-label="Sprint X — coming soon"
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#00C9A7",
          background: "rgba(0,201,167,0.08)",
          padding: "5px 10px",
          borderRadius: 4,
        }}
      >
        Coming Soon
      </div>

      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
        }}
      >
        Sprint X
      </h3>

      <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 240 }}>
        Our next SaaS product is in development. Be the first to know when it launches.
      </p>

      <form
        style={{ display: "flex", gap: 8, width: "100%", maxWidth: 280 }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Sprint X waitlist:", email);
          setEmail("");
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          aria-label="Email for Sprint X waitlist"
          style={{
            flex: 1,
            padding: "9px 12px",
            fontSize: 12,
            background: "var(--bg-input)",
            border: "1px solid var(--border-col)",
            borderRadius: 6,
            color: "var(--text-primary)",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          aria-label="Notify me about Sprint X"
          style={{
            padding: "9px 14px",
            borderRadius: 6,
            background: "#5B5BF6",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "inherit",
          }}
        >
          Notify Me
        </button>
      </form>
    </motion.article>
  );
}

export default function Products() {
  return (
    <section
      id="products"
      aria-label="Our products"
      style={{
        background: "var(--bg-section-b)",
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
            WHAT WE SHIP
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
            Our Products
          </h2>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 16 }}
        >
          <FunnlCard />
          <SprintXCard />
        </motion.div>
      </div>
    </section>
  );
}
