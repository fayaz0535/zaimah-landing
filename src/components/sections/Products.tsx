"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const sectionVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55,  } },
};

function FunnlCard() {
  return (
    <motion.article
      variants={sectionVariants}
      style={{ position: "relative" }}
      aria-label="funnl product"
    >
      {/* Gradient border via pseudo via wrapper */}
      <div
        style={{
          background: "linear-gradient(135deg, #5B5BF6, #00C9A7)",
          borderRadius: 13,
          padding: 1.5,
        }}
      >
        <div
          style={{
            background: "var(--bg-surface)",
            borderRadius: 12,
            padding: 24,
            position: "relative",
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

          {/* Logo */}
          <div style={{ marginBottom: 8 }}>
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
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#00C9A7",
              }}
            >
              Capture. Qualify. Convert.
            </p>
          </div>

          <p
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: 20,
              marginTop: 16,
            }}
          >
            AI-powered lead generation and appointment booking SaaS for UAE SMEs.
            WhatsApp-native, bilingual, and fully autonomous — it qualifies leads,
            books appointments, and follows up without a human in the loop. Built
            for how Gulf businesses actually operate.
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
              "AI agent qualifies and books via WhatsApp",
              "Live CRM dashboard with lead scoring",
              "Arabic and English, out of the box",
              "Sector-aware: salons, clinics, real estate, and more",
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
                <span style={{ color: "#00C9A7", marginTop: 2, flexShrink: 0 }}>✓</span>
                {feat}
              </li>
            ))}
          </ul>

          <a
            href="https://funnl.zaimahtech.ae"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit funnl"
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
        borderRadius: 12,
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
          fontSize: 20,
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
        background: "var(--bg-surface)",
        padding: "80px 0",
      }}
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
          What We Ship
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
          Our Products
        </h2>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <FunnlCard />
          <SprintXCard />
        </motion.div>
      </div>
    </section>
  );
}
