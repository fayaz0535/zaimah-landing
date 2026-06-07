"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail } from "lucide-react";

const services = [
  "AI-Driven Development",
  "IT Consulting",
  "SaaS Products",
  "Web & Hosting Services",
  "Online Training",
  "Digital Marketing",
];

type ToastType = "success" | "error";

interface Toast {
  type: ToastType;
  message: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 12,
  background: "var(--bg-input)",
  border: "1px solid var(--border-col)",
  borderRadius: 8,
  color: "var(--text-primary)",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setForm({ name: "", email: "", company: "", service: "", message: "" });
      showToast("success", "Message sent! We'll be in touch within 24 hours.");
    } catch {
      showToast("error", "Something went wrong. Please email us directly at fayaz@zaimahtech.ae");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact us"
      style={{ background: "var(--bg-page)", padding: "80px 0" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: 64,
          alignItems: "start",
        }}
        className="grid-cols-1 lg:grid-cols-[2fr_3fr]"
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
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
            Get In Touch
          </p>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: "var(--text-primary)",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Let&apos;s Build<br />Something
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: 32,
            }}
          >
            Whether you&apos;re looking to deploy an AI solution, explore funnl for your
            business, or need a technology partner — reach out. We reply fast.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div
                aria-hidden="true"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-col)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={14} color="var(--text-secondary)" />
              </div>
              <div>
                <a
                  href="mailto:fayaz@zaimahtech.ae"
                  style={{ fontSize: 13, color: "#5B5BF6", textDecoration: "none", fontWeight: 500 }}
                >
                  fayaz@zaimahtech.ae
                </a>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                  General enquiries &amp; demos
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div
                aria-hidden="true"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-col)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin size={14} color="var(--text-secondary)" />
              </div>
              <div>
                <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>
                  Dubai, United Arab Emirates
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                  Available for meetings in Dubai
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  aria-required="true"
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#5B5BF6")}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--border-col)")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.ae"
                  aria-required="true"
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#5B5BF6")}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--border-col)")}
                />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label
                htmlFor="company"
                style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Your company name"
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#5B5BF6")}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--border-col)")}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label
                htmlFor="service"
                style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}
              >
                Service of Interest
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                aria-label="Select a service"
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => ((e.target as HTMLSelectElement).style.borderColor = "#5B5BF6")}
                onBlur={(e) => ((e.target as HTMLSelectElement).style.borderColor = "var(--border-col)")}
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="message"
                style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell us what you're working on..."
                aria-required="true"
                style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "#5B5BF6")}
                onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "var(--border-col)")}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              aria-label="Send message"
              style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: 8,
                background: submitting ? "#4a4ae0" : "#5B5BF6",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                transition: "background 0.2s, opacity 0.2s",
                opacity: submitting ? 0.8 : 1,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = "#4a4ae0"; }}
              onMouseLeave={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = "#5B5BF6"; }}
            >
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Toast notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            role="alert"
            aria-live="polite"
            style={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              zIndex: 9999,
              padding: "12px 20px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 500,
              background: toast.type === "success" ? "#0D1A" : "#1A0D0D",
              color: toast.type === "success" ? "#00C9A7" : "#EF4444",
              border: `1px solid ${toast.type === "success" ? "rgba(0,201,167,0.3)" : "rgba(239,68,68,0.3)"}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
              maxWidth: "calc(100vw - 48px)",
              textAlign: "center",
            }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
