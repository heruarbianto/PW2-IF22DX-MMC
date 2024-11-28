/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          // limit upload
          bodySizeLimit: '500mb',
        },
      },
};

export default nextConfig;
