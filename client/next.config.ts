import type { NextConfig } from "next";

const nextConfig = {
  // Enable HTTPS in development
  devServer: {
    https: true
  },
  // Add required headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'microphone=self' // Allow microphone only on same origin
          }
        ],
      },
    ]
  }
}

export default nextConfig;
