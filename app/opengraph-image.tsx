import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { pinnate } from "@/lib/foliage";
import { LogoSvg } from "@/lib/logo-svg";

const PALM = pinnate({
  from: [24, 236],
  control: [58, 44],
  to: [236, 34],
  pairs: 26,
  leafLength: 72,
  leafWidth: 0.09,
  angleBase: 70,
  angleTip: 30,
  droop: 0.6,
});

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
          width="620"
          height="620"
          viewBox="-10 -30 290 290"
          fill="none"
          style={{ position: "absolute", top: -90, right: -120, opacity: 0.22 }}
        >
          <path d={PALM.leafletsB} fill="#7fb069" fillOpacity="0.55" />
          <path d={PALM.leafletsA} fill="#7fb069" fillOpacity="0.9" />
          <path d={PALM.rachis} stroke="#7fb069" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

        <LogoSvg size={84} style={{ marginBottom: 28 }} />

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
