import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0d09",
        }}
      >
        <svg width="110" height="110" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 2 C29 4 37 11 36 20 C35 29 28 36 20 38 C19 38 18 37 16 36 C7 32 3 24 4 16 C5 9 12 3 20 2 Z"
            fill="#7fb069"
          />
          <path
            d="M20 6 V34"
            stroke="#0a0d09"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
