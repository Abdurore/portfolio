import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Accessibility statement for abdurore.tech";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    title: "Accessibility statement",
    eyebrow: "Abdulhameed Oreagba (Abdurore)",
    rows: [
      { key: "Target", value: "WCAG 2.2 AA" },
      { key: "Tested with", value: "Playwright, axe-core, keyboard" },
    ],
  });
}
