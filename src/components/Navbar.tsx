"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.1rem 3.5rem",
        background: "var(--nav-bg)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "0.82rem",
          letterSpacing: "0.06em",
          color: "var(--accent)",
          textDecoration: "none",
        }}
      >
        <span style={{ color: "var(--text-muted)" }}></span>Anindya Arayoga
      </Link>

      {/* Links */}
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          listStyle: "none",
        }}
      >
        {[
          { href: "/#projects", label: "Projects" },
          { href: "/#skills", label: "Skills" },
          { href: "/#about", label: "About" },
          { href: "/contact", label: "Contact" },
        ].map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              style={{
                fontSize: "0.83rem",
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Theme Toggle */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          style={{
            width: "44px",
            height: "24px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "999px",
            cursor: "pointer",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "3px",
              left: "3px",
              width: "16px",
              height: "16px",
              background: "var(--accent)",
              borderRadius: "50%",
              transition: "transform 0.3s ease",
              transform:
                theme === "light" ? "translateX(20px)" : "translateX(0)",
              display: "block",
            }}
          />
        </button>
      )}
    </nav>
  );
}
