import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Accessibility audits by Abdulhameed Oreagba";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    title: "Accessibility audits",
    eyebrow: "Abdulhameed Oreagba (Abdurore)",
    rows: [
      { key: "Standard", value: "WCAG 2.1 AA" },
      { key: "Method", value: "Manual testing with keyboard and NVDA" },
      { key: "Delivered as", value: "Severity-ranked PDF report" },
    ],
  });
}
