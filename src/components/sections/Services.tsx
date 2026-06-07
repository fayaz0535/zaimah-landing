"use client";

import { motion } from "framer-motion";
import {
  Brain,
  BarChart2,
  Laptop,
  Server,
  GraduationCap,
  Megaphone,
} from "lucide-react";

const services = [
  {
    title: "AI-Driven Development",
    description: "We design and build custom AI-powered applications tailored to your business logic — from intelligent automation to decision-support systems.",
    accent: "indigo" as const,
    Icon: Brain,
  },
  {
    title: "IT Consulting",
    description: "Strategic technology advisory to help businesses modernise infrastructure, optimise processes, and build for scale.",
    accent: "teal" as const,
    Icon: BarChart2,
  },
  {
    title: "SaaS Products",
    description: "Purpose-built software products solving real problems for UAE businesses — starting with funnl for lead generation and appointment booking.",
    accent: "indigo" as const,
    Icon: Laptop,
  },
  {
    title: "Web & Hosting Services",
    description: "High-performance web development and managed hosting solutions — secure, scalable, and optimised for the UAE market.",
    accent: "teal" as const,
    Icon: Server,
  },
  {
    title: "Online Training",
    description: "Practical, industry-focused technology training programmes for professionals and teams — delivered online at your own pace.",
    accent: "indigo" as const,
    Icon: GraduationCap,
  },
  {
    title: "Digital Marketing",
    description: "Data-driven digital marketing strategies combining SEO, content, and AI tools to grow your visibility and generate qualified leads.",
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5,  } },
};

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const isIndigo = service.accent === "indigo";
  const accentColor = isIndigo ? "#5B5BF6" : "#00C9A7";
  const accentBg = isIndigo ? "rgba(91,91,246,0.08)" : "rgba(0,201,167,0.08)";

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
      <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {service.description}
      </p>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      aria-label="Our services"
      style={{
        background: "var(--bg-page)",
        padding: "96px 0 80px",
        borderTop: "1px solid var(--border-col)",
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
          What We Do
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
          Our Services
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
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
