"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { usePathname } from "next/navigation";

const SECTION_IDS = ["services", "products", "about", "contact"];
const NAVBAR_H    = 60;
const SCROLL_OFFS = 100;

const NAV_ITEMS = [
  { id: "home",     label: "Home",     href: "#",         isHome: true  },
  { id: "services", label: "Services", href: "#services", isHome: false },
  { id: "products", label: "Products", href: "#products", isHome: false },
  { id: "about",    label: "About",    href: "#about",    isHome: false },
  { id: "blog",     label: "Blog",     href: "/blog",     isHome: false },
  { id: "contact",  label: "Contact",  href: "#contact",  isHome: false },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen]       = useState(false);

  useEffect(() => {
    function detect() {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y < 100) { setActiveSection("home"); return; }
      let active = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop - NAVBAR_H - SCROLL_OFFS <= y) active = id;
      }
      setActiveSection(active || "home");
    }
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.id === "blog") return pathname?.startsWith("/blog") ?? false;
    return activeSection === item.id;
  };

  return (
    <>
      <nav
        className="nav"
        aria-label="Main navigation"
        style={{
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          background: scrolled
            ? theme === "dark" ? "rgba(15,15,26,0.88)" : "rgba(255,255,255,0.88)"
            : "var(--bg-primary)",
        }}
      >
        {/* gradient underline */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(91,111,212,0.35) 30%, rgba(78,207,179,0.35) 70%, transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Col 1 — Logo */}
        <a href="/" aria-label="ZAIMAH Technologies home" style={{ textDecoration: "none", position: "relative", zIndex: 1 }}>
          <div className="logo-top">
            <span className="lz">Z</span>
            <span className="la">A</span>
            <span className="li">I</span>
            <span className="lm">MAH</span>
          </div>
          <div className="lsub">Technologies</div>
        </a>

        {/* Col 2 — Desktop nav links */}
        <ul className="nav-links" role="list">
          {NAV_ITEMS.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={link.isHome ? scrollToTop : undefined}
                  style={{
                    position: "relative",
                    display: "block",
                    paddingBottom: 4,
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--ink)" : "var(--ink-mid)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = active ? "var(--ink)" : "var(--ink-mid)")}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: "absolute", bottom: -1, left: 0, right: 0,
                        height: 2, background: "var(--indigo)", borderRadius: 1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Col 3 — Right actions */}
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <a href="#contact" className="nav-cta" style={{ textDecoration: "none" }}>
            Get in Touch
          </a>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

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
              style={{ position: "fixed", inset: 0, zIndex: 98, background: "rgba(0,0,0,0.4)" }}
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
                zIndex: 99,
                background: "var(--bg-primary)",
                borderBottom: "0.5px solid var(--border)",
                padding: "20px 24px 28px",
              }}
              role="dialog"
              aria-label="Mobile navigation"
            >
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
                {NAV_ITEMS.map((link) => (
                  <li key={link.id} style={{ borderBottom: "0.5px solid var(--border)" }}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
                        closeMobile();
                      }}
                      style={{ display: "block", padding: "16px 0", fontSize: 17, fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  onClick={() => { toggleTheme(); closeMobile(); }}
                  aria-label="Toggle theme"
                  style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: 16 }}
                >
                  {theme === "dark" ? "☀️" : "🌙"}
                </button>
                <a
                  href="#contact"
                  onClick={closeMobile}
                  style={{ flex: 1, padding: "12px 0", borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: "none", textAlign: "center", background: "var(--indigo)", color: "#fff", display: "block" }}
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
