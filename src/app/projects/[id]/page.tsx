import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import NextProjectCard from "./NextProjectCard";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

const accentColors: Record<string, string> = {
  "Computer Vision": "#00d4c8",
  "Edge AI": "#00b84d",
  "Audio AI": "#a855f7",
  NLP: "#7c6ffd",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const accent = accentColors[project.category] ?? "#00d4c8";
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main
      style={{
        position: "relative",
        zIndex: 1,
        padding: "8rem 5rem 6rem",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {/* Back */}
      <Link
        href="/projects"
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "3rem",
        }}
      >
        ← All Projects
      </Link>

      {/* Category badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "0.72rem",
          color: accent,
          background: `${accent}18`,
          border: `1px solid ${accent}30`,
          borderRadius: 999,
          padding: "0.4rem 1rem",
          marginBottom: "1.5rem",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: accent,
            display: "inline-block",
          }}
        />
        {project.category}
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--font-dm-serif), serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "var(--text)",
          lineHeight: 1.15,
          marginBottom: "1rem",
        }}
      >
        {project.title}
      </h1>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "3rem",
        }}
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.68rem",
              color: "var(--text-muted)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "0.25rem 0.7rem",
              borderRadius: 999,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Section 1 — The Hook */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: `3px solid ${accent}`,
          borderRadius: 16,
          padding: "2rem 2.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.68rem",
            color: accent,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          01 — The Problem
        </div>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--text)",
            lineHeight: 1.85,
            fontFamily: "var(--font-dm-serif), serif",
          }}
        >
          {project.overview}
        </p>
      </div>

      {/* Section 2 — Metrics */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "2rem 2.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.68rem",
            color: accent,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          02 — Results &amp; Impact
        </div>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {project.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                background: `${accent}0d`,
                border: `1px solid ${accent}25`,
                borderRadius: 12,
                padding: "1.25rem 1.75rem",
                minWidth: 120,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-dm-serif), serif",
                  fontSize: "1.8rem",
                  color: accent,
                  display: "block",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.05em",
                  marginTop: "0.3rem",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 — Technical */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "2rem 2.5rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.68rem",
            color: accent,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          03 — Technical Deep Dive
        </div>
        <p
          style={{
            fontSize: "0.97rem",
            color: "var(--text-muted)",
            lineHeight: 1.9,
          }}
        >
          {project.technical}
        </p>
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "5rem",
        }}
      >
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.85rem 2rem",
              background: "var(--surface)",
              color: "var(--text)",
              fontWeight: 500,
              fontSize: "0.88rem",
              border: "1px solid var(--border)",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
            View on GitHub
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.85rem 2rem",
              background: accent,
              color: "#080d1a",
              fontWeight: 700,
              fontSize: "0.88rem",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Live Demo
          </a>
        )}
      </div>

      {/* Next project — client component untuk hover interactivity */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Next Project
        </div>
        <NextProjectCard project={nextProject} accent={accent} />
      </div>
    </main>
  );
}
