/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          // limit upload
          bodySizeLimit: '700mb',
        },
      },
};

export default nextConfig;
