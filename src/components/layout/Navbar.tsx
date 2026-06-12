"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";

// All sections to check for scroll-based active detection (including process which has no nav link)
const SECTION_IDS = ["services", "products", "process", "about", "contact"];
const NAVBAR_H    = 80;
const SCROLL_OFFS = 100;

// Nav items shown in the header and mobile drawer
const NAV_ITEMS = [
  { id: "home",     label: "Home",     href: "#",         isHome: true  },
  { id: "services", label: "Services", href: "#services", isHome: false },
  { id: "products", label: "Products", href: "#products", isHome: false },
  { id: "about",    label: "About",    href: "#about",    isHome: false },
  { id: "blog",     label: "Blog",     href: "/blog",     isHome: false },
  { id: "contact",  label: "Contact",  href: "#contact",  isHome: false },
] as const;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen]       = useState(false);

  // Single scroll listener handles glassmorphism + active section
  useEffect(() => {
    function detect() {
      const y = window.scrollY;
      setScrolled(y > 80);

      if (y < 100) {
        setActiveSection("home");
        return;
      }

      // Walk sections; active = last one whose adjusted top is ≤ scrollY
      let active = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop - NAVBAR_H - SCROLL_OFFS <= y) {
          active = id;
        }
      }
      setActiveSection(active || "home");
    }

    detect(); // initialise on mount
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  const closeMobile   = useCallback(() => setMobileOpen(false), []);
  const scrollToTop   = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navBg = scrolled
    ? theme === "dark" ? "rgba(13,13,26,0.85)" : "rgba(255,255,255,0.85)"
    : "var(--bg-surface)";

  return (
    <>
      <header
        role="banner"
        style={{
          position: "sticky",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: NAVBAR_H,
          background: navBg,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 0.3s",
        }}
      >
        {/* 2px gradient border bottom */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(91,91,246,0.4) 30%, rgba(0,201,167,0.4) 70%, transparent)",
          }}
        />

        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          {/* Logo — left col */}
          <a
            href="/"
            aria-label="ZAIMAH TECHNOLOGIES home"
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            <div style={{ lineHeight: 1.1 }}>
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.01em", color: "var(--text-primary)" }}>
                Z
                <span
                  style={{
                    background: "linear-gradient(90deg, #5B5BF6, #00C9A7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                    fontSize: 22,
                  }}
                >
                  AI
                </span>
                MAH
              </span>
            </div>
            <div style={{ fontSize: 8.5, fontWeight: 500, letterSpacing: "0.24em", color: "var(--text-muted)", marginTop: 2 }}>
              T E C H N O L O G I E S
            </div>
          </a>

          {/* Center nav links — desktop */}
          <ul
            className="hidden md:flex"
            style={{ listStyle: "none", gap: 32, alignItems: "center" }}
            role="list"
          >
            {NAV_ITEMS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} style={{ position: "relative" }}>
                  <a
                    href={link.href}
                    onClick={link.isHome ? scrollToTop : undefined}
                    style={{
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                      textDecoration: "none",
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      transition: "color 0.2s",
                      paddingBottom: 4,
                      display: "block",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isActive ? "var(--text-primary)" : "var(--text-secondary)")}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position: "absolute",
                          bottom: -2, left: 0, right: 0,
                          height: 2,
                          background: "linear-gradient(90deg, #5B5BF6, #00C9A7)",
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
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end" }}>
            {/* Theme toggle — desktop */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="hidden md:flex"
              style={{
                width: 36, height: 36,
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
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Get in Touch CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex"
              style={{
                padding: "10px 22px",
                borderRadius: 9,
                fontSize: 13,
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

            {/* Hamburger — mobile */}
            <button
              className="flex md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-primary)", padding: 4 }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              style={{ position: "fixed", inset: 0, zIndex: 48, background: "rgba(0,0,0,0.4)" }}
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "fixed",
                top: NAVBAR_H, left: 0, right: 0,
                zIndex: 49,
                background: "var(--bg-surface)",
                borderBottom: "1px solid var(--border-col)",
                padding: "20px 24px 28px",
              }}
              role="dialog"
              aria-label="Mobile navigation"
            >
              <ul style={{ listStyle: "none", marginBottom: 20 }}>
                {NAV_ITEMS.map((link) => (
                  <li key={link.id} style={{ borderBottom: "1px solid var(--border-col)" }}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.isHome) {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                        closeMobile();
                      }}
                      style={{
                        display: "block",
                        padding: "18px 0",
                        fontSize: 18,
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
                    width: 40, height: 40,
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
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <a
                  href="#contact"
                  onClick={closeMobile}
                  style={{
                    flex: 1,
                    padding: "12px 0",
                    borderRadius: 9,
                    fontSize: 14,
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
