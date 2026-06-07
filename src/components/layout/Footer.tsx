"use client";

const quickLinks = [
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// Inline SVG social icons — lucide-react dropped these in v0.400+
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

const socialLinks = [
  { href: "#", label: "LinkedIn",   Icon: LinkedInIcon  },
  { href: "#", label: "Twitter / X", Icon: XIcon         },
  { href: "#", label: "Instagram",  Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-col)",
      }}
      role="contentinfo"
    >
      {/* Main columns */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 40,
        }}
        className="grid-cols-1 md:grid-cols-3"
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
              Z<span className="gradient-text">AI</span>MAH
            </span>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", color: "var(--text-muted)", marginTop: 3 }}>
              T E C H N O L O G I E S
            </div>
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 220 }}>
            Think forward. Build different.
            <br />
            Dubai-based AI technology company.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>
            Quick Links
          </div>
          <ul style={{ listStyle: "none" }}>
            {quickLinks.map((l) => (
              <li key={l.href} style={{ marginBottom: 10 }}>
                <a
                  href={l.href}
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#5B5BF6")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)")}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>
            Follow Us
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "1px solid var(--border-col)",
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
          <div style={{ marginTop: 24 }}>
            <a
              href="mailto:fayaz@zaimahtech.ae"
              style={{ fontSize: 12, color: "#5B5BF6", textDecoration: "none" }}
            >
              fayaz@zaimahtech.ae
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--border-col)",
          padding: "16px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} ZAIMAH TECHNOLOGIES. All rights reserved. · Dubai, UAE
        </p>
      </div>
    </footer>
  );
}
