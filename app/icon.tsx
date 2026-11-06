import { ImageResponse } from "next/og";
import { LogoSvg } from "@/lib/logo-svg";

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
          background: "#eef0e5",
        }}
      >
        <LogoSvg size={52} />
      </div>
    ),
    { ...size }
  );
}
