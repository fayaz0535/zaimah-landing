"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";

const services = [
  "AI-Driven Development",
  "IT Consulting",
  "SaaS Products",
  "Web & Hosting Services",
  "Online Training",
  "Digital Marketing",
];

type ToastType = "success" | "error";
interface Toast { type: ToastType; message: string; }

const contactItems = [
  {
    accent: "indigo" as const,
    Icon: Mail,
    label: "Email us directly",
    value: "fayaz@zaimahtech.ae",
    href: "mailto:fayaz@zaimahtech.ae",
  },
  {
    accent: "teal" as const,
    Icon: MapPin,
    label: "Find us",
    value: "Dubai, UAE",
    href: null,
  },
  {
    accent: "indigo" as const,
    Icon: Clock,
    label: "Working hours",
    value: "Sun – Thu, 9am – 6pm GST",
    href: null,
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 13px",
  fontSize: 12,
  background: "var(--bg-surface)",
  border: "1px solid var(--border-col)",
  borderRadius: 9,
  color: "var(--text-primary)",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = "#5B5BF6";
  el.style.boxShadow = "0 0 0 3px rgba(91,91,246,0.08)";
}
function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = "var(--border-col)";
  el.style.boxShadow = "none";
}

export default function Contact() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
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
      if (!res.ok) throw new Error("failed");
      setForm({ name: "", email: "", company: "", service: "", message: "" });
      showToast("success", "Message sent! We'll be in touch within 24 hours.");
    } catch {
      showToast("error", "Something went wrong. Please email us at fayaz@zaimahtech.ae");
    } finally {
      setSubmitting(false);
    }
  };

  const formCardBg = theme === "dark" ? "rgba(255,255,255,0.03)" : "#F9FAFB";

  return (
    <section
      id="contact"
      aria-label="Contact us"
      style={{
        background: "var(--bg-section-b)",
        padding: "72px 32px",
        borderTop: "1px solid var(--border-col)",
      }}
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto", gap: 48, alignItems: "start" }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr]"
      >
        <div style={{ display: "contents" }}>
          {/* Left col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ paddingRight: 0 }}
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
              GET IN TOUCH
            </p>

            <h2
              style={{
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                marginBottom: 16,
              }}
            >
              Let&apos;s Build<br />
              <span
                style={{
                  background: "linear-gradient(90deg, #5B5BF6, #00C9A7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Something Great
              </span>
              <br />Together
            </h2>

            <p
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: 28,
                maxWidth: 380,
              }}
            >
              Whether you have a project in mind, want to explore our services, or simply
              want to learn more — we respond fast and we mean it.
            </p>

            {/* Contact detail cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {contactItems.map((item) => {
                const isIndigo    = item.accent === "indigo";
                const accentColor = isIndigo ? "#5B5BF6" : "#00C9A7";
                const accentBg    = isIndigo ? "rgba(91,91,246,0.08)" : "rgba(0,201,167,0.08)";
                return (
                  <div
                    key={item.label}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-col)",
                      borderRadius: 11,
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
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
                        flexShrink: 0,
                      }}
                    >
                      <item.Icon size={15} color={accentColor} strokeWidth={1.75} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2 }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", textDecoration: "none" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#ECFDF5",
                border: "1px solid rgba(0,201,167,0.2)",
                borderRadius: 10,
                padding: "10px 16px",
              }}
            >
              <span
                aria-hidden="true"
                style={{ width: 7, height: 7, borderRadius: "50%", background: "#00C9A7", flexShrink: 0 }}
              />
              <span style={{ fontSize: 11, fontWeight: 500, color: "#065F46" }}>
                We typically respond within 24 hours
              </span>
            </div>
          </motion.div>

          {/* Right col — form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            style={{
              background: formCardBg,
              border: "1px solid var(--border-col)",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
              Send us a message
            </h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 22 }}>
              Fill in the form and we&apos;ll be in touch shortly.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1: Name + Email */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{ gap: 12, marginBottom: 12 }}
              >
                <div>
                  <label htmlFor="name" style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>
                    Full Name
                  </label>
                  <input
                    id="name" name="name" type="text"
                    value={form.name} onChange={handleChange}
                    required placeholder="Your name"
                    aria-required="true"
                    style={inputStyle}
                    onFocus={focusInput} onBlur={blurInput}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input
                    id="email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    required placeholder="you@company.ae"
                    aria-required="true"
                    style={inputStyle}
                    onFocus={focusInput} onBlur={blurInput}
                  />
                </div>
              </div>

              {/* Row 2: Company + Service */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{ gap: 12, marginBottom: 12 }}
              >
                <div>
                  <label htmlFor="company" style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>
                    Company
                  </label>
                  <input
                    id="company" name="company" type="text"
                    value={form.company} onChange={handleChange}
                    placeholder="Your company"
                    style={inputStyle}
                    onFocus={focusInput} onBlur={blurInput}
                  />
                </div>
                <div>
                  <label htmlFor="service" style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>
                    Service of Interest
                  </label>
                  <select
                    id="service" name="service"
                    value={form.service} onChange={handleChange}
                    aria-label="Select a service"
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={focusInput} onBlur={blurInput}
                  >
                    <option value="">Select a service…</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="message" style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>
                  Message
                </label>
                <textarea
                  id="message" name="message"
                  value={form.message} onChange={handleChange}
                  required rows={4}
                  placeholder="Tell us what you&apos;re working on…"
                  aria-required="true"
                  style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                  onFocus={focusInput} onBlur={blurInput}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                aria-label="Send message"
                style={{
                  width: "100%",
                  padding: "13px 0",
                  borderRadius: 9,
                  background: "linear-gradient(90deg, #5B5BF6, #00C9A7)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.75 : 1,
                  transition: "opacity 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {submitting ? "Sending…" : "Send Message →"}
              </button>

              <p style={{ fontSize: 10, color: "var(--text-muted)", textAlign: "center", marginTop: 12 }}>
                No spam. We only reach out about your enquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast — bottom-right slide-in */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, x: 60, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            role="alert"
            aria-live="polite"
            style={{
              position: "fixed",
              bottom: 88,
              right: 24,
              zIndex: 9999,
              padding: "14px 20px",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 500,
              background: toast.type === "success" ? "#F0FDF4" : "#FEF2F2",
              color: toast.type === "success" ? "#15803D" : "#DC2626",
              border: `1px solid ${toast.type === "success" ? "rgba(0,201,167,0.3)" : "rgba(239,68,68,0.3)"}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
              maxWidth: 320,
            }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
