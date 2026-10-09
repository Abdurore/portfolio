import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function AccessibilityOpengraphImage() {
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
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#b9d4a6",
            marginBottom: 20,
          }}
        >
          Abdurore
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#ecf1e4",
            lineHeight: 1.1,
            maxWidth: 950,
          }}
        >
          Accessibility statement
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 28,
            color: "#7fb069",
          }}
        >
          Targeting WCAG 2.2 AA
        </div>
      </div>
    ),
    { ...size }
  );
}
