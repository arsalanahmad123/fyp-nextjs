import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
                pathname: '*/*',
            },
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com',
                port: '',
                search: '',
            },
        ],
    },
};

export default nextConfig;
