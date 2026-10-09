import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdurore — Full-Stack Developer",
    short_name: "Abdurore",
    description:
      "Abdurore (Abdulhameed Oreagba) is a full-stack developer and Mechatronics student in Lagos, Nigeria.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0d09",
    theme_color: "#0a0d09",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}
