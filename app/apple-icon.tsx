import { ImageResponse } from "next/og";
import { LogoSvg } from "@/lib/logo-svg";

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
        <LogoSvg size={132} />
      </div>
    ),
    { ...size }
  );
}
