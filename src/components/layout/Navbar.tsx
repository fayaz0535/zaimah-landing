"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Glassmorphism on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const navBg = scrolled
    ? theme === "dark"
      ? "rgba(6,6,14,0.82)"
      : "rgba(255,255,255,0.82)"
    : "transparent";

  return (
    <>
      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 68,
          background: navBg,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 0.3s, backdrop-filter 0.3s",
        }}
      >
        {/* Gradient border bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(91,91,246,0.3) 30%, rgba(0,201,167,0.3) 70%, transparent)",
          }}
        />

        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            aria-label="ZAIMAH TECHNOLOGIES home"
            style={{ textDecoration: "none", flexShrink: 0 }}
          >
            <div style={{ lineHeight: 1 }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  color: "var(--text-primary)",
                }}
              >
                Z
                <span
                  className="gradient-text"
                  style={{ fontWeight: 700, fontSize: 18 }}
                >
                  AI
                </span>
                MAH
              </span>
            </div>
            <div
              style={{
                fontSize: 8,
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                marginTop: 2,
              }}
            >
              T E C H N O L O G I E S
            </div>
          </a>

          {/* Desktop links */}
          <ul
            className="hidden md:flex"
            style={{ listStyle: "none", gap: 32, alignItems: "center" }}
            role="list"
          >
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href} style={{ position: "relative" }}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      textDecoration: "none",
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      transition: "color 0.2s",
                      paddingBottom: 4,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isActive ? "var(--text-primary)" : "var(--text-secondary)")}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="active-underline"
                        style={{
                          position: "absolute",
                          bottom: -2, left: 0, right: 0,
                          height: 2,
                          background: "linear-gradient(90deg, rgba(91,91,246,0.5), rgba(0,201,167,0.5))",
                          borderRadius: 1,
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Theme toggle — hidden on mobile */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="hidden md:flex"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid var(--border-col)",
                background: "transparent",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                transition: "border-color 0.2s, color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#5B5BF6";
                (e.currentTarget as HTMLButtonElement).style.color = "#5B5BF6";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-col)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
              }}
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex"
              style={{
                padding: "8px 18px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                textDecoration: "none",
                background: theme === "dark" ? "#F0F0FF" : "#111827",
                color: theme === "dark" ? "#06060E" : "#FFFFFF",
                transition: "opacity 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              Get in Touch
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="flex md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-primary)",
                padding: 4,
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 98,
                background: "rgba(0,0,0,0.4)",
              }}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: 68, left: 0, right: 0,
                zIndex: 99,
                background: "var(--bg-surface)",
                borderBottom: "1px solid var(--border-col)",
                padding: "20px 24px 28px",
              }}
              role="dialog"
              aria-label="Mobile navigation"
            >
              <ul style={{ listStyle: "none", marginBottom: 20 }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href} style={{ borderBottom: "1px solid var(--border-col)" }}>
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      style={{
                        display: "block",
                        padding: "14px 0",
                        fontSize: 15,
                        fontWeight: 500,
                        textDecoration: "none",
                        color: "var(--text-primary)",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button
                  onClick={() => { toggleTheme(); closeMobile(); }}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  style={{
                    width: 36, height: 36,
                    borderRadius: "50%",
                    border: "1px solid var(--border-col)",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                  }}
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>

                <a
                  href="#contact"
                  onClick={closeMobile}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    textAlign: "center",
                    background: "#5B5BF6",
                    color: "#fff",
                  }}
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
