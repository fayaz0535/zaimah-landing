"use client";

import { useTheme } from "@/components/ui/ThemeProvider";

const clients = ["Shave Crave Salon", "Dubai Wellness Clinic", "Sunset Real Estate", "UAE SMEs"];

export default function TrustStrip() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      aria-label="Trusted by clients"
      style={{
        background: isDark ? "rgba(255,255,255,0.02)" : "#F9FAFB",
        borderTop:    `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#F3F4F6"}`,
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#F3F4F6"}`,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        gap: 28,
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          flexShrink: 0,
        }}
      >
        TRUSTED BY
      </span>
      {clients.map((name) => (
        <span
          key={name}
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: isDark ? "#333344" : "#D1D5DB",
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
