"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_a767gh9";
const EMAILJS_TEMPLATE_ID = "template_n75r2ys";
const EMAILJS_PUBLIC_KEY = "RWFAmOGuOyLtfuZ_c";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.9rem 1.1rem",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    color: "var(--text)",
    fontSize: "0.95rem",
    outline: "none",
    fontFamily: "var(--font-outfit), sans-serif",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-jetbrains), monospace",
    fontSize: "0.72rem",
    color: "var(--text-muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <main
      style={{
        position: "relative",
        zIndex: 1,
        padding: "9rem 6rem 6rem",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.72rem",
            color: "var(--accent)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          // 04 — contact
        </span>
        <div style={{ width: 60, height: 1, background: "var(--border)" }} />
      </div>
      <h1
        style={{
          fontFamily: "var(--font-dm-serif), serif",
          fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
          color: "var(--text)",
          marginBottom: "1rem",
          lineHeight: 1.15,
        }}
      >
        Let&apos;s Connect
      </h1>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "1rem",
          lineHeight: 1.8,
          maxWidth: 520,
          marginBottom: "4rem",
        }}
      >
        Whether you&apos;re a tech lead looking for an AI engineer, a researcher
        seeking collaboration, or a recruiter with an exciting role — I&apos;d
        love to hear from you.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "4rem",
          alignItems: "start",
        }}
      >
        {/* ── FORM ── */}
        <div>
          {status === "sent" ? (
            <div
              style={{
                background: "var(--accent-glow)",
                border: "1px solid rgba(0,212,200,0.25)",
                borderRadius: 16,
                padding: "3rem 2.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
              <div
                style={{
                  fontFamily: "var(--font-dm-serif), serif",
                  fontSize: "1.6rem",
                  color: "var(--text)",
                  marginBottom: "0.75rem",
                }}
              >
                Message Sent!
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.92rem",
                  lineHeight: 1.7,
                }}
              >
                Thanks for reaching out. I&apos;ll get back to you as soon as
                possible.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.4rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.2rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    name="from_email"
                    required
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Job opportunity / Collaboration"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={7}
                  placeholder="Tell me about your project or opportunity..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              {status === "error" && (
                <p
                  style={{
                    color: "#f87171",
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-jetbrains), monospace",
                  }}
                >
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  padding: "0.95rem 2.5rem",
                  background: "var(--accent)",
                  color: "#080d1a",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                  transition: "opacity 0.2s, transform 0.2s",
                  alignSelf: "flex-start",
                  letterSpacing: "0.02em",
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </div>

        {/* ── RIGHT SIDE ── */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Status */}
          <div
            style={{
              background: "var(--accent-glow)",
              border: "1px solid rgba(0,212,200,0.2)",
              borderRadius: 12,
              padding: "1.5rem 1.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.6rem",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                  animation: "blink 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "0.72rem",
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                }}
              >
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              Open to full-time roles, freelance projects, and research
              collaborations.
            </p>
          </div>

          {/* Direct email */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "1.5rem 1.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "0.68rem",
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Direct Email
            </div>
            <a
              href="mailto:anindyaprayoga127@gmail.com"
              style={{
                fontSize: "0.92rem",
                color: "var(--text)",
                textDecoration: "none",
                wordBreak: "break-all",
              }}
            >
              anindyaprayoga127@gmail.com
            </a>
          </div>

          {/* Social links */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "1.5rem 1.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "0.68rem",
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Find Me On
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    dangerouslySetInnerHTML={{ __html: s.icon }}
                  />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        input::placeholder, textarea::placeholder { color: var(--text-muted); opacity: 0.5; }
      `}</style>
    </main>
  );
}

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/anindyaprayoga",
    icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>',
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/anindya-prayoga-421882302",
    icon: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  },
  // {
  //   label: "Twitter / X",
  //   href: "https://www.linkedin.com/in/anindyaprayoga",
  //   icon: '<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>',
  // },
  {
    label: "Hugging Face",
    href: "https://huggingface.co/AnindyaPrayoga",
    icon: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
  },
];
