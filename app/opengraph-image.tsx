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
          background: "#0a0a0a",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 28,
            color: "#8a8a8a",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: "#a3e635",
            }}
          />
          Available for full-stack work
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            color: "#f5f5f5",
            lineHeight: 1.05,
          }}
        >
          {profile.alias} — {profile.role}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            color: "#8a8a8a",
            maxWidth: 900,
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
