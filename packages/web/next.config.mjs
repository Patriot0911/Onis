/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    redirects: () => [
        {
            source: '/',
            destination: '/my-collections',
            permanent: true,
        },
        {
            source: '/home',
            destination: '/my-collections',
            permanent: true,
        },
    ],
};

export default nextConfig;
