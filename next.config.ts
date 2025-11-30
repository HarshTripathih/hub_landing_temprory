import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['d1b9peg0jj5bry.cloudfront.net'], // ✅ Allow this external host
  },
};

export default nextConfig;
