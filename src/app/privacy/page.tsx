import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | ZAIMAH Technologies",
  description: "Privacy policy for ZAIMAH Technologies — how we collect, use, and protect your data in compliance with UAE PDPA requirements.",
};

const SECTIONS = [
  {
    title: "1. Data We Collect",
    body: "We collect only the information you provide directly — name, email address, and service interest — when you submit our contact form. We do not collect any data automatically beyond standard server access logs.",
  },
  {
    title: "2. How We Use Your Data",
    body: "Your contact information is used solely to respond to your enquiry and, with your consent, to send relevant service information. We do not sell, rent, or share your data with third parties for marketing purposes.",
  },
  {
    title: "3. UAE PDPA Compliance",
    body: "ZAIMAH Technologies processes personal data in accordance with the UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPA). You have the right to access, correct, or request deletion of your personal data at any time.",
  },
  {
    title: "4. Data Retention",
    body: "Contact enquiry data is retained for up to 12 months or until your request is fulfilled, after which it is securely deleted. You may request earlier deletion by emailing fayaz@zaimahtech.ae.",
  },
  {
    title: "5. Cookies",
    body: "This website does not use tracking cookies or third-party analytics scripts. We use session storage only for theme preference (light/dark mode), which remains on your device.",
  },
  {
    title: "6. Third-Party Services",
    body: "Our products (funnl, SprintX) connect to WhatsApp Business API (Meta) and cloud infrastructure. Data processed through these services is governed by their respective privacy policies.",
  },
  {
    title: "7. Contact",
    body: "For any privacy-related enquiries or data subject requests, contact us at: fayaz@zaimahtech.ae — ZAIMAH Technologies, Dubai, UAE.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "72px 32px" }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5B6FD4", marginBottom: 10 }}>
            LEGAL
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.015em", color: "#1B1B35", marginBottom: 8 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 48 }}>
            Last updated: June 2026 · ZAIMAH Technologies, Dubai, UAE
          </p>

          <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.85, marginBottom: 40 }}>
            At ZAIMAH Technologies, we take your privacy seriously. This policy explains what
            data we collect, why we collect it, and how we protect it — in plain language.
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
              Questions about this policy?{" "}
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
