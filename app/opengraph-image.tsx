import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CADA Galaxy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#050507",
          display: "flex",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left: brand */}
        <div
          style={{
            width: 460,
            height: "100%",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 60px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#ff6a3d",
              marginBottom: 28,
              display: "flex",
            }}
          >
            51°02′N · 13°47′E
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              textTransform: "uppercase",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>CADA</span>
            <span style={{ color: "#ff6a3d" }}>GALAXY</span>
          </div>
          <div
            style={{
              marginTop: 32,
              width: 48,
              height: 2,
              background: "#ff6a3d",
              display: "flex",
            }}
          />
          <div
            style={{
              marginTop: 20,
              fontSize: 13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              display: "flex",
            }}
          >
            CADA Invest GmbH · Dresden
          </div>
        </div>

        {/* Right: description */}
        <div
          style={{
            flex: 1,
            padding: "0 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#ff6a3d",
              marginBottom: 28,
              display: "flex",
            }}
          >
            / DIGITALE ERLEBNISSE
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: "#ffffff",
              lineHeight: 1.35,
              maxWidth: "16em",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Websites, die im Gedächtnis bleiben — durch 3D, Tempo und Präzision.
          </div>
          <div
            style={{
              marginTop: 48,
              display: "flex",
              gap: 32,
            }}
          >
            {[
              { value: "100", label: "Lighthouse" },
              { value: "∅14", label: "Tage" },
              { value: "3D", label: "WebGL" },
            ].map((stat) => (
              <div key={stat.value} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: "#ff6a3d",
                    lineHeight: 1,
                    display: "flex",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    display: "flex",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
