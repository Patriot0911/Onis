/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    redirects: () => [
        {
            source: '/',
            destination: '/home',
            permanent: true,
        },
    ],
};

export default nextConfig;
