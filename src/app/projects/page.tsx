"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { projects, Project } from "@/data/projects";

const CATEGORIES = ["All", "Computer Vision", "Edge AI", "Audio AI", "NLP"];

const accentColors: Record<string, string> = {
  "Computer Vision": "#00d4c8",
  "Edge AI": "#00b84d",
  "Audio AI": "#a855f7",
  "NLP": "#7c6ffd",
};

export default function ProjectsPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <main style={{ position: "relative", zIndex: 1, padding: "8rem 5rem 6rem" }}>

      {/* Header */}
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1rem" }}>
          <span style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.72rem", color: "var(--accent)",
            letterSpacing: "0.12em", textTransform: "uppercase",
          }}>// all_projects</span>
          <div style={{ width: 60, height: 1, background: "var(--border)" }} />
        </div>
        <h1 style={{
          fontFamily: "var(--font-dm-serif), serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          color: "var(--text)", marginBottom: "1rem",
        }}>All Projects</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: 520, lineHeight: 1.75 }}>
          A collection of AI systems I&apos;ve built — from medical imaging to industrial monitoring.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", marginBottom: "3rem" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.76rem", letterSpacing: "0.06em",
              padding: "0.5rem 1.1rem", borderRadius: 999, cursor: "pointer",
              border: `1px solid ${active === cat ? "var(--accent)" : "var(--border)"}`,
              background: active === cat ? "var(--accent-glow)" : "transparent",
              color: active === cat ? "var(--accent)" : "var(--text-muted)",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "1.5rem",
      }}>
        {filtered.map((p, i) => (
          <ProjectGridCard key={p.id} project={p} delay={i * 0.08} />
        ))}
      </div>

      {/* Back */}
      <div style={{ marginTop: "4rem" }}>
        <Link href="/" style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "0.8rem", color: "var(--text-muted)",
          textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
        }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

function ProjectGridCard({ project, delay }: { project: Project; delay: number }) {
  const accent = accentColors[project.category] ?? "#00d4c8";

  return (
    <Link
      href={`/projects/${project.id}`}
      className="reveal"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: 16, overflow: "hidden",
        display: "flex", flexDirection: "column",
        textDecoration: "none", color: "inherit",
        transitionDelay: `${delay}s`,
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = accent;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 60px ${accent}14`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Color bar top */}
      <div style={{ width: "100%", height: 3, background: accent, opacity: 0.6 }} />

      <div style={{ padding: "1.75rem" }}>
        {/* Category */}
        <div style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "0.68rem", letterSpacing: "0.1em",
          textTransform: "uppercase", color: accent, marginBottom: "0.75rem",
        }}>{project.category}</div>

        {/* Title */}
        <h2 style={{
          fontFamily: "var(--font-dm-serif), serif",
          fontSize: "1.3rem", color: "var(--text)",
          marginBottom: "0.85rem", lineHeight: 1.3,
        }}>{project.title}</h2>

        {/* Overview */}
        <p style={{
          fontSize: "0.85rem", color: "var(--text-muted)",
          lineHeight: 1.75, marginBottom: "1.5rem",
        }}>{project.overview}</p>

        {/* Metrics */}
        <div style={{
          display: "flex", gap: "1.2rem", flexWrap: "wrap",
          paddingTop: "1.25rem", borderTop: "1px solid var(--border)",
          marginBottom: "1.25rem",
        }}>
          {project.metrics.map((m) => (
            <div key={m.label}>
              <span style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "0.95rem", fontWeight: 600, color: accent, display: "block",
              }}>{m.value}</span>
              <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.66rem", color: "var(--text-muted)",
              background: "var(--surface)", border: "1px solid var(--border)",
              padding: "0.22rem 0.6rem", borderRadius: 999,
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "1rem 1.75rem",
        borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "0.74rem", color: accent,
        }}>View Case Study →</span>
        {project.githubUrl && (
          <span style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.72rem", color: "var(--text-muted)",
          }}>GitHub ↗</span>
        )}
      </div>
    </Link>
  );
}
