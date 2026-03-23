"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Background synapse particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0,
      animId = 0;
    let mx = -9999,
      my = -9999;

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function isDark() {
      return !document.documentElement.classList.contains("light");
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      const dc = isDark();
      const dot = dc ? "rgba(0,212,200,.42)" : "rgba(0,122,116,.32)";
      const lc = dc ? "rgba(0,212,200," : "rgba(0,122,116,";
      pts.forEach((p, i) => {
        const dx = mx - p.x,
          dy = my - p.y,
          d = Math.hypot(dx, dy);
        if (d < 100) {
          p.x -= dx * 0.012;
          p.y -= dy * 0.012;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dot;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j],
            dd = Math.hypot(p.x - q.x, p.y - q.y);
          if (dd < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lc + 0.13 * (1 - dd / 130) + ")";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(loop);
    }
    loop();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const total = projects.length;
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(total - 1, c + 1));

  const accentColors: Record<string, string> = {
    "Computer Vision": "#00d4c8",
    "Edge AI": "#00b84d",
    "Audio AI": "#a855f7",
    NLP: "#7c6ffd",
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
        }}
      />

      {/* ══ HERO ══ */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 460px",
          alignItems: "center",
          gap: "4rem",
          padding: "10rem 6rem 6rem",
        }}
      >
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.78rem",
              color: "var(--accent)",
              background: "var(--accent-glow)",
              border: "1px solid rgba(0,212,200,0.18)",
              borderRadius: "999px",
              padding: "0.5rem 1.2rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
                animation: "blink 2s infinite",
              }}
            />
            Available for opportunities
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "clamp(3rem, 5.5vw, 5rem)",
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: "1.75rem",
            }}
          >
            Building AI that
            <br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              thinks
            </em>
            , sees,
            <br />
            and understands.
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              lineHeight: 1.85,
              maxWidth: 520,
              marginBottom: "2.75rem",
            }}
          >
            I&apos;m{" "}
            <strong style={{ color: "var(--text)" }}>
              Anindya Samantha Prayoga
            </strong>{" "}
            — an AI Engineer specializing in Computer Vision, NLP, and Signal
            Processing. I turn raw data into systems that create real-world
            impact.
          </p>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "3.5rem",
            }}
          >
            <Link
              href="#projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2.25rem",
                background: "var(--accent)",
                color: "#080d1a",
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: 10,
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2.25rem",
                background: "transparent",
                color: "var(--text)",
                fontWeight: 500,
                fontSize: "0.95rem",
                border: "1px solid var(--border)",
                borderRadius: 10,
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get in Touch
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "3.5rem",
              paddingTop: "2.75rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            {[
              { value: "3+", label: "AI Projects" },
              { value: "8+", label: "Tools & Frameworks" },
              { value: "3", label: "AI Domains" },
            ].map(({ value, label }) => (
              <div key={label}>
                <span
                  style={{
                    fontFamily: "var(--font-dm-serif), serif",
                    fontSize: "2.4rem",
                    color: "var(--accent)",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "0.76rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    marginTop: "0.3rem",
                    display: "block",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <PhotoPlaceholder />
      </section>

      {/* ══ PROJECTS ══ */}
      <section
        id="projects"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "7rem 6rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                marginBottom: "0.85rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                // 01 — featured_work
              </span>
              <div
                style={{ width: 60, height: 1, background: "var(--border)" }}
              />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-dm-serif), serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                color: "var(--text)",
              }}
            >
              Selected Projects
            </h2>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { fn: prev, label: "←" },
              { fn: next, label: "→" },
            ].map(({ fn, label }) => (
              <button
                key={label}
                onClick={fn}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text)";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: "1.75rem",
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              transform: `translateX(calc(-${current} * (calc(100% / 3 + 0.58rem))))`,
            }}
          >
            {projects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                accentColor={accentColors[p.category] ?? "#00d4c8"}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "2.5rem",
          }}
        >
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 24 : 7,
                height: 7,
                borderRadius: 999,
                background: i === current ? "var(--accent)" : "var(--border)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3.5rem",
          }}
        >
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.25rem",
              background: "transparent",
              color: "var(--text)",
              fontWeight: 500,
              fontSize: "0.92rem",
              border: "1px solid var(--border)",
              borderRadius: 10,
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text)";
            }}
          >
            View All Projects →
          </Link>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section
        id="skills"
        style={{ position: "relative", zIndex: 1, padding: "5rem 6rem 7rem" }}
      >
        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.75rem",
              color: "var(--accent)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            // 02 — capabilities
          </span>
          <div style={{ width: 60, height: 1, background: "var(--border)" }} />
          <h2
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              color: "var(--text)",
            }}
          >
            Skills &amp; Tools
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.1rem",
          }}
        >
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              className="reveal"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "1.4rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1.1rem",
                transitionDelay: `${i * 0.05}s`,
                transition:
                  "border-color 0.25s, transform 0.25s, opacity 0.65s ease, transform 0.65s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--accent)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--accent-glow)",
                  border: "1px solid rgba(0,212,200,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  dangerouslySetInnerHTML={{ __html: s.icon }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {s.sub}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 2,
                    background: "var(--border)",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${s.level}%`,
                      height: "100%",
                      background:
                        "linear-gradient(90deg, var(--accent), var(--accent2))",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section
        id="about"
        style={{ position: "relative", zIndex: 1, padding: "5rem 6rem 8rem" }}
      >
        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.75rem",
              color: "var(--accent)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            // 03 — about_me
          </span>
          <div style={{ width: 60, height: 1, background: "var(--border)" }} />
          <h2
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              color: "var(--text)",
            }}
          >
            Who I Am
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "6rem",
            alignItems: "center",
          }}
        >
          <div className="reveal">
            {[
              <span key="1">
                I&apos;m{" "}
                <strong style={{ color: "var(--text)" }}>
                  Anindya Samantha Prayoga
                </strong>
                , an AI Engineer with a deep passion for solving real-world
                problems through intelligent systems. My work spans Computer
                Vision, Natural Language Processing, and Audio Signal Analysis.
              </span>,
              <span key="2">
                I don&apos;t just build models — I build{" "}
                <strong style={{ color: "var(--text)" }}>
                  solutions with measurable impact
                </strong>
                . From helping radiologists detect brain tumors faster to
                enabling factories to predict equipment failures before they
                happen, I focus on bridging the gap between AI research and
                practical deployment.
              </span>,
              <span key="3">
                Currently expanding expertise in{" "}
                <strong style={{ color: "var(--text)" }}>
                  multimodal AI, LLM fine-tuning, and edge computing
                </strong>{" "}
                — always learning, always building.
              </span>,
            ].map((text, i) => (
              <p
                key={i}
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.95,
                  fontSize: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {text}
              </p>
            ))}
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2.25rem",
                marginTop: "0.5rem",
                background: "var(--accent)",
                color: "#080d1a",
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Let&apos;s Build Something →
            </Link>
          </div>

          <div
            className="reveal"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              transitionDelay: "0.2s",
            }}
          >
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.1rem",
                  padding: "1.1rem 1.4rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "var(--accent-glow)",
                    border: "1px solid rgba(0,212,200,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    dangerouslySetInnerHTML={{ __html: h.icon }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--text)",
                      fontWeight: 600,
                    }}
                  >
                    {h.text}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                      marginTop: "0.15rem",
                    }}
                  >
                    {h.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid var(--border)",
          padding: "2rem 6rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
          }}
        >
          © 2025 Anindya Samantha Prayoga
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
          }}
        >
          AI Engineer · Indonesia
        </span>
      </footer>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </>
  );
}

/* ══ PHOTO PLACEHOLDER ══ */
function PhotoPlaceholder() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 500,
          borderRadius: 28,
          background:
            "radial-gradient(ellipse at center, rgba(0,212,200,0.07) 0%, transparent 70%)",
          filter: "blur(24px)",
          zIndex: -1,
        }}
      />
      {/* Frame */}
      <div
        style={{
          position: "relative",
          width: 360,
          height: 440,
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}
      >
        {/* Foto asli */}
        <Image
          src="/profile.png"
          alt="Anindya Samantha Prayoga"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
        />
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.18) 3px,rgba(0,0,0,.18) 4px)",
          }}
        />
        {/* Sweep line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 2,
            zIndex: 4,
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.45,
            animation: "sweep 3.5s linear infinite",
          }}
        />
        {/* Corner brackets */}
        {[
          { top: 12, left: 12, borderWidth: "1.5px 0 0 1.5px" },
          { top: 12, right: 12, borderWidth: "1.5px 1.5px 0 0" },
          { bottom: 12, left: 12, borderWidth: "0 0 1.5px 1.5px" },
          { bottom: 12, right: 12, borderWidth: "0 1.5px 1.5px 0" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 14,
              height: 14,
              zIndex: 5,
              borderColor: "var(--accent)",
              borderStyle: "solid",
              ...s,
            }}
          />
        ))}
        {/* Label */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 6,
            padding: "1.75rem 1.4rem 1.4rem",
            background:
              "linear-gradient(0deg, rgba(8,13,26,0.92) 0%, transparent 100%)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "1.1rem",
              color: "#f0f4ff",
            }}
          >
            Anindya Samantha Prayoga
          </div>
          <div
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.7rem",
              color: "var(--accent)",
              letterSpacing: "0.06em",
              marginTop: "0.25rem",
            }}
          >
            AI Engineer · Computer Vision · NLP
          </div>
        </div>
      </div>
      <style>{`
        @keyframes sweep {
          0%   { top: 0%; opacity: 0; }
          5%   { opacity: 0.5; }
          95%  { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ══ PROJECT CARD dengan gambar nyata + animasi overlay ══ */
function ProjectCard({
  project,
  accentColor,
  delay,
}: {
  project: (typeof projects)[0];
  accentColor: string;
  delay: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);

  const thumbnailMap: Record<string, string> = {
    "brain-tumor-mri": "/projects/brain-mri.jpg",
    "waste-sorter": "/projects/waste-sorter.jpg",
    "pump-anomaly": "/projects/pump-anomaly.jpg",
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const canvas = c;
    const parent = canvas.parentElement!;
    function sz() {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }
    sz();
    window.addEventListener("resize", sz);
    const ctx = canvas.getContext("2d")!;
    let t = Math.random() * 100,
      animId = 0;

    const type =
      project.id === "brain-tumor-mri"
        ? "mri"
        : project.id === "waste-sorter"
          ? "waste"
          : "pump";

    const pal: Record<string, [number, number, number]> = {
      mri: [0, 212, 200],
      waste: [0, 230, 100],
      pump: [180, 100, 255],
    };
    const [r, g, b] = pal[type];

    function draw() {
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (type === "mri") {
        const cx = W / 2,
          cy = H * 0.46;
        ctx.save();
        ctx.scale(1, 0.82);
        ctx.beginPath();
        ctx.ellipse(cx, cy / 0.82, W * 0.34, H * 0.36, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},.3)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.scale(1, 0.82);
        ctx.beginPath();
        ctx.ellipse(
          cx - W * 0.04,
          cy / 0.82,
          W * 0.18,
          H * 0.28,
          -0.15,
          Math.PI,
          Math.PI * 2,
        );
        ctx.strokeStyle = `rgba(${r},${g},${b},.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.scale(1, 0.82);
        ctx.beginPath();
        ctx.ellipse(
          cx + W * 0.04,
          cy / 0.82,
          W * 0.18,
          H * 0.28,
          0.15,
          Math.PI,
          Math.PI * 2,
        );
        ctx.strokeStyle = `rgba(${r},${g},${b},.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.2);
        const tx = cx + W * 0.14,
          ty = cy - H * 0.1;
        ctx.beginPath();
        ctx.arc(tx, ty, 6 + pulse * 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.7 + pulse * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(tx, ty, 2 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},1)`;
        if (pulse > 0.7) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${r},${g},${b},.7)`;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        const sy = (0.5 + 0.5 * Math.sin(t * 0.32)) * H;
        const sg = ctx.createLinearGradient(0, sy - 2, 0, sy + 2);
        sg.addColorStop(0, "transparent");
        sg.addColorStop(0.5, `rgba(${r},${g},${b},.55)`);
        sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg;
        ctx.fillRect(0, sy - 2, W, 4);
      }

      if (type === "waste") {
        const bx = W * 0.1,
          by = H * 0.08,
          bw = W * 0.8,
          bh = H * 0.7;
        ctx.strokeStyle = `rgba(${r},${g},${b},.5)`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(bx, by, bw, bh);
        [
          [bx, by],
          [bx + bw, by],
          [bx, by + bh],
          [bx + bw, by + bh],
        ].forEach(([cx, cy]) => {
          const s = 9;
          ctx.beginPath();
          ctx.moveTo(cx - s, cy);
          ctx.lineTo(cx + s, cy);
          ctx.moveTo(cx, cy - s);
          ctx.lineTo(cx, cy + s);
          ctx.strokeStyle = `rgba(${r},${g},${b},.85)`;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
        const prog = 0.91 + Math.sin(t * 0.2) * 0.05;
        ctx.fillStyle = `rgba(${r},${g},${b},.12)`;
        ctx.fillRect(bx, by + bh + 8, bw, 5);
        ctx.fillStyle = `rgba(${r},${g},${b},.65)`;
        ctx.fillRect(bx, by + bh + 8, bw * prog, 5);
        const sy = (0.5 + 0.5 * Math.sin(t * 0.28)) * H;
        const sg = ctx.createLinearGradient(0, sy - 2, 0, sy + 2);
        sg.addColorStop(0, "transparent");
        sg.addColorStop(0.5, `rgba(${r},${g},${b},.5)`);
        sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg;
        ctx.fillRect(0, sy - 2, W, 4);
      }

      if (type === "pump") {
        const wy = H * 0.75;
        ctx.beginPath();
        for (let x = 0; x < W; x++) {
          const norm = x / W;
          let amp =
            Math.sin(x * 0.12 + t) * 7 + Math.sin(x * 0.05 - t * 0.8) * 4;
          if (norm > 0.58 && norm < 0.72)
            amp +=
              Math.sin(x * 0.4 + t * 3) *
              20 *
              (1 - Math.abs(norm - 0.65) / 0.07);
          x === 0 ? ctx.moveTo(x, wy + amp) : ctx.lineTo(x, wy + amp);
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},.65)`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, wy - 20);
        ctx.lineTo(W, wy - 20);
        ctx.strokeStyle = `rgba(${r},${g},${b},.22)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        const alertPulse = 0.5 + 0.5 * Math.sin(t * 2.5);
        ctx.beginPath();
        ctx.arc(W * 0.65, H * 0.35, 6 + alertPulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.5 + alertPulse * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(W * 0.65, H * 0.35, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},1)`;
        if (alertPulse > 0.7) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${r},${g},${b},.7)`;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // scanlines
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,.16)";
        ctx.fillRect(0, y, canvas.width, 1);
      }

      t += 0.04;
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", sz);
    };
  }, [project.id]);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="reveal"
      style={{
        flex: "0 0 calc(33.333% - 1.17rem)",
        background: "var(--card-bg)",
        border: `1px solid ${hovered ? accentColor + "55" : "var(--border)"}`,
        borderRadius: 18,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        transitionDelay: `${delay}s`,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? `0 28px 60px ${accentColor}12` : "none",
        transition:
          "border-color 0.3s, transform 0.3s, box-shadow 0.3s, opacity 0.65s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual — real image + animation overlay */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Real photo */}
        <Image
          src={thumbnailMap[project.id] ?? "/projects/brain-mri.jpg"}
          alt={project.title}
          fill
          style={{ objectFit: "cover", opacity: 0.55 }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Animation overlay */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
        />
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.2) 3px,rgba(0,0,0,.2) 4px)",
          }}
        />
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,.6) 100%)",
          }}
        />
        {/* Sweep line on hover */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 1,
              zIndex: 4,
              background: `linear-gradient(90deg,transparent,${accentColor},transparent)`,
              opacity: 0.7,
              animation: "sweep 2.5s linear infinite",
            }}
          />
        )}
        {/* Label overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            padding: "0.85rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: accentColor,
              background: "rgba(0,0,0,0.5)",
              padding: "0.25rem 0.6rem",
              borderRadius: 4,
              opacity: 0.85,
            }}
          >
            {project.id === "brain-tumor-mri"
              ? "MEDICAL_CV"
              : project.id === "waste-sorter"
                ? "EDGE_AI"
                : "AUDIO_AI"}
          </span>
        </div>
        <style>{`@keyframes sweep{0%{top:0%;opacity:0}5%{opacity:.7}95%{opacity:.7}100%{top:100%;opacity:0}}`}</style>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "1.6rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
            color: accentColor,
          }}
        >
          {project.category}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "1.25rem",
            color: "var(--text)",
            marginBottom: "0.75rem",
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: "0.86rem",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            flex: 1,
          }}
        >
          {project.overview}
        </p>
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            marginTop: "1.25rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {project.metrics.map((m) => (
            <div key={m.label}>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "1rem",
                  fontWeight: 600,
                  display: "block",
                  color: accentColor,
                }}
              >
                {m.value}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.04em",
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.45rem",
            flexWrap: "wrap",
            marginTop: "1rem",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "0.67rem",
                color: "var(--text-muted)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "0.22rem 0.65rem",
                borderRadius: 999,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ══ DATA ══ */
const SKILLS = [
  {
    name: "Computer Vision",
    sub: "CNN, YOLO, EfficientNet",
    level: 90,
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>',
  },
  {
    name: "NLP",
    sub: "Transformers, BERT, LLMs",
    level: 80,
    icon: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
  },
  {
    name: "Audio AI",
    sub: "Signal Processing, LSTM",
    level: 75,
    icon: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  },
  {
    name: "PyTorch",
    sub: "Training & finetuning",
    level: 88,
    icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  },
  {
    name: "Python",
    sub: "NumPy, Pandas, Scikit-learn",
    level: 92,
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  },
  {
    name: "Edge Deployment",
    sub: "ONNX, TensorRT, Pi",
    level: 70,
    icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  },
  {
    name: "Data Engineering",
    sub: "Preprocessing, Augmentation",
    level: 82,
    icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  },
  {
    name: "MLOps",
    sub: "Docker, FastAPI, HF",
    level: 65,
    icon: '<path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>',
  },
];

const HIGHLIGHTS = [
  {
    text: "Problem-First Mindset",
    sub: "Real impact over tech complexity",
    icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  },
  {
    text: "Research-Driven Development",
    sub: "SOTA techniques on real data",
    icon: '<path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>',
  },
  {
    text: "End-to-End Capable",
    sub: "Data pipeline to deployment",
    icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  },
  {
    text: "International Standard",
    sub: "Built for global teams",
    icon: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>',
  },
  {
    text: "Continuously Growing",
    sub: "Adding new AI domains regularly",
    icon: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  },
];
