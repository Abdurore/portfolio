import { profile } from "@/data/profile";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = `${profile.name} (${profile.handle}), full-stack developer in Lagos`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    title: profile.name,
    eyebrow: profile.handle,
    rows: [
      { key: "Based in", value: "Lagos, Nigeria" },
      { key: "Role", value: "Full-stack developer" },
      { key: "Open to", value: "Remote, part-time or contract" },
    ],
  });
}
