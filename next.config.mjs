/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'next-gooogle.vercel.app',
                port:'',
                pathname:'/**',
            },
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
                port:'',
                pathname:'/**',
            }
        ],
    },
};

export default nextConfig;
