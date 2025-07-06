import type { NextConfig } from "next";

//Produção
//destination: https://docius-api-csharp.fly.dev/api/:path*,

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5273/api/:path*",
      },
    ];
  },
};

export default nextConfig;
