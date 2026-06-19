"use client";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { SubpageLayout } from "@/components/SubpageLayout";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const COMPANY = {
  name: "CADA Invest GmbH",
  street: "Glashütter Str. 53",
  city: "01309 Dresden",
  email: "info@cada-galaxy.de",
  mapsUrl:
    "https://maps.google.com/maps?q=Glash%C3%BCtter+Str.+53%2C+01309+Dresden&z=16&output=embed",
};

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "1px solid var(--line)",
  color: "var(--ink)",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  fontWeight: 300,
  padding: "14px 16px",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 8,
};

export default function KontaktPage() {
  const { lang } = useLanguage();
  const t = translations[lang].kontakt;
  const f = t.fields;

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(localStorage.getItem("cadagalaxy-consent"));
    const onConsent = () => setConsent(localStorage.getItem("cadagalaxy-consent"));
    window.addEventListener("cadagalaxy-consent", onConsent);
    return () => window.removeEventListener("cadagalaxy-consent", onConsent);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const formData = new FormData(form);
      formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");
      formData.append("subject", "Neue Anfrage über cada-galaxy.de");
      formData.append("from_name", "CADA Galaxy Website");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <SubpageLayout>
      {/* Hero */}
      <section style={{ padding: `${sectionPad} ${px}`, borderBottom: "1px solid var(--line)" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 20,
          }}
        >
          {t.eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: "clamp(3rem, 7vw, 7rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            maxWidth: "18ch",
            marginBottom: 32,
          }}
        >
          {t.h1}
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "50ch", fontWeight: 300, lineHeight: 1.65, fontSize: "clamp(15px, 1.4vw, 18px)" }}>
          {t.desc}
        </p>
      </section>

      {/* Form + Sidebar */}
      <section
        style={{
          padding: `${sectionPad} ${px}`,
          display: "grid",
          gridTemplateColumns: "1fr minmax(280px, 400px)",
          gap: "clamp(48px, 7vw, 96px)",
          alignItems: "start",
        }}
        className="kontakt-main-grid"
      >
        {/* Left: form */}
        <div>
          {status === "success" ? (
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
                color: "var(--accent)",
              }}
            >
              {t.success}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 28px)" }} className="form-grid">
                <div>
                  <label htmlFor="name" style={labelStyle}>{f.name}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={f.name_placeholder}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--line)"; }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>{f.email}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={f.email_placeholder}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--line)"; }}
                  />
                </div>
                <div>
                  <label htmlFor="phone" style={labelStyle}>{f.phone}</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={f.phone_placeholder}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--line)"; }}
                  />
                </div>
                <div>
                  <label htmlFor="company" style={labelStyle}>{f.company}</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={f.company_placeholder}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--line)"; }}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="service" style={labelStyle}>{f.service}</label>
                  <select
                    id="service"
                    name="service"
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--line)"; }}
                  >
                    <option value="" style={{ background: "#050507" }}>{f.service_placeholder}</option>
                    {t.service_options.map((opt) => (
                      <option key={opt} value={opt} style={{ background: "#050507" }}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="message" style={labelStyle}>{f.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder={f.message_placeholder}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--line)"; }}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    style={{ marginTop: 3, accentColor: "var(--accent)", flexShrink: 0 }}
                  />
                  <label
                    htmlFor="privacy"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      lineHeight: 1.6,
                      cursor: "pointer",
                    }}
                  >
                    {f.privacy}
                  </label>
                </div>
              </div>

              {status === "error" && (
                <div
                  style={{
                    marginTop: 16,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ff4444",
                  }}
                >
                  {t.error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  marginTop: 28,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--bg)",
                  background: status === "sending" ? "var(--muted)" : "var(--accent)",
                  padding: "14px 28px",
                  border: "none",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "opacity 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (status !== "sending") (e.currentTarget as HTMLElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                {f.submit}
                <span className="cta-arrow" />
              </button>
            </form>
          )}
        </div>

        {/* Right: address + hours + maps */}
        <div>
          {/* Koordinaten */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 20,
            }}
          >
            / KONTAKT
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              lineHeight: 1.8,
              fontSize: 15,
              color: "var(--muted)",
              marginBottom: 28,
            }}
          >
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{COMPANY.name}</strong>
            <br />
            {COMPANY.street}
            <br />
            {COMPANY.city}
            <br />
            <br />
            <a
              href={`mailto:${COMPANY.email}`}
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              {COMPANY.email}
            </a>
            <br />
            <a
              href="tel:+491621766880"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              +49 162 176 68 80
            </a>
          </p>

          {/* Erreichbarkeit */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 12,
            }}
          >
            / ERREICHBARKEIT
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--muted)",
              lineHeight: 1.9,
              marginBottom: 28,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: 18,
              maxWidth: 220,
            }}
          >
            <span>Mo–Fr</span>
            <span>08:00 – 18:00 Uhr</span>
            <span>Sa</span>
            <span>09:00 – 14:00 Uhr</span>
          </div>

          {/* Google Maps */}
          <div style={{ overflow: "hidden", border: "1px solid var(--line)" }}>
            {consent === "all" ? (
              <iframe
                src={COMPANY.mapsUrl}
                width="100%"
                height="260"
                style={{
                  display: "block",
                  border: 0,
                  filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CADA Invest GmbH — Glashütter Str. 53, 01309 Dresden"
              />
            ) : (
              <div
                style={{
                  height: 260,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  textAlign: "center",
                  padding: "0 28px",
                  background: "rgba(13,17,42,0.60)",
                  backdropFilter: "blur(7px)",
                  WebkitBackdropFilter: "blur(7px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Karte wird nach Cookie-Einwilligung geladen.
                  <br />
                  <Link
                    href="/datenschutz"
                    style={{ color: "var(--accent)", textDecoration: "none" }}
                  >
                    Datenschutz
                  </Link>
                </p>
                <button
                  onClick={() => window.dispatchEvent(new Event("cadagalaxy-open-banner"))}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    background: "transparent",
                    border: "1px solid var(--accent)",
                    padding: "9px 18px",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color = "var(--bg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  }}
                >
                  Cookie-Einstellungen öffnen
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 820px) { .kontakt-main-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </SubpageLayout>
  );
}
