import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://docius-api-csharp.fly.dev/api/:path*',
          },
        ];
      },
};

export default nextConfig;
