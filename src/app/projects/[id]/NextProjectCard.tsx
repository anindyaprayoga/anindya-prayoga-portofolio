"use client";

import Link from "next/link";
import { Project } from "@/data/projects";

export default function NextProjectCard({
  project,
  accent,
}: {
  project: Project;
  accent: string;
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.5rem 2rem",
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 12, textDecoration: "none",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div>
        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
          {project.category}
        </div>
        <div style={{
          fontFamily: "var(--font-dm-serif), serif",
          fontSize: "1.2rem", color: "var(--text)",
        }}>{project.title}</div>
      </div>
      <span style={{ fontSize: "1.5rem", color: accent }}>→</span>
    </Link>
  );
}
