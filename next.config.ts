import { resolve } from 'node:path';
import type { NextConfig } from 'next';

const threeClockTimerShimRelativePath = './lib/three-clock-timer-shim.ts';
const threeClockTimerShimWebpackPath = resolve(
  process.cwd(),
  'lib/three-clock-timer-shim.ts'
);

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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias ?? {}),
        // Match only bare `three` imports so `three/*` subpaths stay untouched.
        'three$': threeClockTimerShimWebpackPath,
      };
    }

    return config;
  },
  turbopack: {
    resolveAlias: {
      three: {
        browser: threeClockTimerShimRelativePath,
      },
    },
  },
};

export default nextConfig;
