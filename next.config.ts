import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Canonicalize onto the real domain. These only take effect once
      // abdurore-dev.vercel.app and www.abdurore.tech are added as domain
      // aliases pointing at THIS Vercel project in the dashboard — a
      // separate/old deployment on abdurore-dev.vercel.app won't pick
      // this config up on its own.
      {
        source: "/:path*",
        has: [{ type: "host", value: "abdurore-dev.vercel.app" }],
        destination: "https://abdurore.tech/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.abdurore.tech" }],
        destination: "https://abdurore.tech/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
