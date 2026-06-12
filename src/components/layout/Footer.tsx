"use client";

// Inline SVG social icons — lucide-react dropped these in older versions
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const serviceLinks = [
  "AI Development",
  "IT Consulting",
  "SaaS Products",
  "Web & Hosting",
  "Online Training",
  "Digital Marketing",
];

const productLinks = [
  { label: "funnl",   href: "https://funnl.zaimahtech.ae",   external: true },
  { label: "SprintX", href: "https://sprintx.zaimahtech.ae", external: true },
];

const companyLinks = [
  { label: "About",           href: "#about"    },
  { label: "Contact",         href: "#contact"  },
  { label: "Privacy Policy",  href: "/privacy"  },
  { label: "Terms of Service",href: "/terms"    },
];

const socialLinks = [
  { href: "https://www.linkedin.com/company/zaimahtech", label: "LinkedIn",    Icon: LinkedInIcon   },
  { href: "#",                                            label: "Twitter / X", Icon: XIcon          },
  { href: "#",                                            label: "Instagram",   Icon: InstagramIcon  },
];

const linkStyle: React.CSSProperties = {
  fontSize: 11,
  color: "var(--text-muted)",
  textDecoration: "none",
  display: "block",
  marginBottom: 10,
  transition: "color 0.2s",
};

function FooterLink({ href, label, external = false }: { href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={linkStyle}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#5B5BF6")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
    >
      {label}
    </a>
  );
}

function ColHeading({ text }: { text: string }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        marginBottom: 16,
      }}
    >
      {text}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-col)",
      }}
      role="contentinfo"
    >
      {/* 4-col grid */}
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px 20px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
      >
        <div style={{ display: "contents" }}>
          {/* Col 1 — Brand */}
          <div style={{ marginBottom: 32 }}>
            <a href="/" aria-label="ZAIMAH TECHNOLOGIES home" style={{ textDecoration: "none", display: "inline-block", marginBottom: 12 }}>
              <div style={{ lineHeight: 1.1 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>
                  Z
                  <span
                    style={{
                      background: "linear-gradient(90deg, #5B5BF6, #00C9A7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    AI
                  </span>
                  MAH
                </span>
              </div>
              <div style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.18em", color: "var(--text-muted)", marginTop: 2 }}>
                T E C H N O L O G I E S
              </div>
            </a>
            <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 210 }}>
              Dubai-based technology company building intelligent software products for UAE businesses and beyond.
            </p>
          </div>

          {/* Col 2 — Services */}
          <div style={{ marginBottom: 32 }}>
            <ColHeading text="Services" />
            {serviceLinks.map((s) => <FooterLink key={s} href="#services" label={s} />)}
          </div>

          {/* Col 3 — Products */}
          <div style={{ marginBottom: 32 }}>
            <ColHeading text="Products" />
            {productLinks.map((p) => (
              <FooterLink key={p.label} href={p.href} label={p.label} external={p.external} />
            ))}
          </div>

          {/* Col 4 — Company */}
          <div style={{ marginBottom: 32 }}>
            <ColHeading text="Company" />
            {companyLinks.map((c) => <FooterLink key={c.label} href={c.href} label={c.label} />)}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "18px 32px",
          borderTop: "1px solid var(--border-col)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
          © 2026 ZAIMAH TECHNOLOGIES. All rights reserved. | Built in Dubai 🇦🇪
        </p>

        {/* Social icons */}
        <div style={{ display: "flex", gap: 8 }}>
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "1px solid var(--border-col)",
                background: "var(--bg-surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "#5B5BF6";
                el.style.color = "#5B5BF6";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border-col)";
                el.style.color = "var(--text-secondary)";
              }}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
