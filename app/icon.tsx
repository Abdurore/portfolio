import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
          fontSize: 36,
          fontWeight: 700,
          color: "#08080c",
          fontFamily: "sans-serif",
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
