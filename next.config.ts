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
};

export default nextConfig;
