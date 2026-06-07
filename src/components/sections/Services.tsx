"use client";

import { motion } from "framer-motion";
import { Brain, BarChart2, Laptop, Server, GraduationCap, Megaphone } from "lucide-react";

const services = [
  {
    title: "AI-Driven Development",
    description: "Custom AI-powered applications from intelligent automation to decision-support systems tailored to your business.",
    accent: "indigo" as const,
    Icon: Brain,
  },
  {
    title: "IT Consulting",
    description: "Strategic advisory to modernise infrastructure, optimise processes, and scale your business for growth.",
    accent: "teal" as const,
    Icon: BarChart2,
  },
  {
    title: "SaaS Products",
    description: "Purpose-built software solving real problems — starting with funnl for UAE lead generation and appointment booking.",
    accent: "indigo" as const,
    Icon: Laptop,
  },
  {
    title: "Web & Hosting",
    description: "High-performance web development and managed hosting solutions optimised for the UAE market.",
    accent: "teal" as const,
    Icon: Server,
  },
  {
    title: "Online Training",
    description: "Industry-focused technology training programmes delivered online at your own pace.",
    accent: "indigo" as const,
    Icon: GraduationCap,
  },
  {
    title: "Digital Marketing",
    description: "SEO, content and AI tools to grow your visibility and generate qualified leads across the UAE.",
    accent: "teal" as const,
    Icon: Megaphone,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const isIndigo    = service.accent === "indigo";
  const accentColor = isIndigo ? "#5B5BF6" : "#00C9A7";
  const accentBg    = isIndigo ? "rgba(91,91,246,0.08)" : "rgba(0,201,167,0.08)";

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -3 }}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-col)",
        borderRadius: 12,
        padding: 20,
        cursor: "default",
        transition: "box-shadow 0.25s",
        height: "100%",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
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
          marginBottom: 14,
        }}
      >
        <service.Icon size={18} color={accentColor} strokeWidth={1.75} />
      </div>

      <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
        {service.title}
      </h3>
      <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 12 }}>
        {service.description}
      </p>
      <a
        href="#contact"
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#5B5BF6",
          textDecoration: "none",
          display: "block",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
      >
        Learn more →
      </a>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      aria-label="Our services"
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
            WHAT WE DO
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
            Our Services
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: 500,
              marginBottom: 40,
            }}
          >
            End-to-end technology solutions built specifically for the UAE market —
            from AI development to digital marketing.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 16 }}
          role="list"
        >
          {services.map((s) => (
            <div key={s.title} role="listitem">
              <ServiceCard service={s} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
