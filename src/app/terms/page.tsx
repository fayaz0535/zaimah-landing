import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | ZAIMAH Technologies",
  description: "Terms of service for ZAIMAH Technologies products and services — funnl, SprintX, and IT services.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using any ZAIMAH Technologies service — including this website, funnl, or SprintX — you agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately.",
  },
  {
    title: "2. Services",
    body: "ZAIMAH Technologies provides AI-powered software products, IT consulting, web development, online training, and digital marketing services. Service availability and scope are defined in individual service agreements where applicable.",
  },
  {
    title: "3. Acceptable Use",
    body: "You agree to use our services only for lawful purposes and in accordance with applicable UAE laws and regulations. You must not use our services to transmit spam, conduct fraud, or engage in any activity that violates third-party rights.",
  },
  {
    title: "4. Intellectual Property",
    body: "All content, software, and materials on zaimahtech.ae and our products (funnl, SprintX) are the intellectual property of ZAIMAH Technologies and protected under UAE copyright law. Unauthorised reproduction or distribution is prohibited.",
  },
  {
    title: "5. funnl & SprintX Product Terms",
    body: "Access to funnl and SprintX is subject to separate subscription agreements. Usage of WhatsApp Business API through funnl is subject to Meta's Business Terms of Service. ZAIMAH Technologies is not responsible for third-party platform policy changes.",
  },
  {
    title: "6. Limitation of Liability",
    body: "To the fullest extent permitted by UAE law, ZAIMAH Technologies shall not be liable for any indirect, incidental, or consequential damages arising from use of our services. Our total liability shall not exceed fees paid in the preceding 30 days.",
  },
  {
    title: "7. Governing Law",
    body: "These terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.",
  },
  {
    title: "8. Changes to Terms",
    body: "We may update these terms at any time. Continued use of our services after changes constitutes acceptance of the revised terms. Material changes will be communicated via email to registered users.",
  },
  {
    title: "9. Contact",
    body: "For questions about these terms, contact us at: fayaz@zaimahtech.ae — ZAIMAH Technologies, Dubai, UAE.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "72px 32px" }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B6FD4", marginBottom: 10 }}>
            LEGAL
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.015em", color: "#1B1B35", marginBottom: 8 }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 48 }}>
            Last updated: June 2026 · ZAIMAH Technologies, Dubai, UAE
          </p>

          <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.85, marginBottom: 40 }}>
            These Terms of Service govern your use of ZAIMAH Technologies&apos; website and products.
            Please read them carefully.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1B1B35", marginBottom: 10 }}>{s.title}</h2>
                <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.85 }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, padding: "20px 24px", background: "#F5F5F5", borderRadius: 12, border: "1px solid #E8E8E8" }}>
            <p style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.75 }}>
              Questions about these terms?{" "}
              <a href="mailto:fayaz@zaimahtech.ae" style={{ color: "#5B6FD4", textDecoration: "none", fontWeight: 600 }}>
                fayaz@zaimahtech.ae
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
