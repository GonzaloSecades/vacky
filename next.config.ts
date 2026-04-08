import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['uploadthing', '@uploadthing/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qzkm7tlm4u.ufs.sh',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      three: {
        browser: './lib/three-clock-timer-shim.ts',
      },
    },
  },
};

export default nextConfig;
