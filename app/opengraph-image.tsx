import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#0a0d09",
          backgroundImage:
            "linear-gradient(to right, rgba(236,241,228,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,241,228,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          fontFamily: "sans-serif",
        }}
      >
        <svg
          width="320"
          height="320"
          viewBox="0 0 40 40"
          fill="none"
          style={{ position: "absolute", top: -40, right: -40, opacity: 0.5 }}
        >
          <path
            d="M20 2 C29 4 37 11 36 20 C35 29 28 36 20 38 C19 38 18 37 16 36 C7 32 3 24 4 16 C5 9 12 3 20 2 Z"
            stroke="#3b5a34"
            strokeWidth="1"
          />
        </svg>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 26,
            color: "#b9d4a6",
            marginBottom: 32,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#7fb069" }} />
          Available for full-stack work
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#ecf1e4",
            lineHeight: 1.08,
          }}
        >
          {profile.commonName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#7fb069",
            lineHeight: 1.08,
          }}
        >
          ({profile.alias})
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "#b9d4a6",
            maxWidth: 820,
          }}
        >
          Full-Stack Developer in Lagos, Nigeria
        </div>
      </div>
    ),
    { ...size }
  );
}
