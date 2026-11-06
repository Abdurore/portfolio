import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdulhameed Oreagba (Abdurore)",
    short_name: "Abdurore",
    description:
      "Full-stack developer in Lagos, Nigeria.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef0e5",
    theme_color: "#eef0e5",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}
