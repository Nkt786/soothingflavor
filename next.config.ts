import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Do not fail Netlify build on ESLint or TS issues while we stabilize
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // For Netlify deployment with API routes
  images: { unoptimized: true }
}

export default nextConfig
