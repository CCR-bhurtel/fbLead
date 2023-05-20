/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        // This works only on client side
        /* 
    	If you need a proxy in getServerSideProps, 
        you must specify the full url for example: 'http://localhost:5000'
    */
        return [
            {
                source: '/api/:path*',
                destination: 'https://y-lyart-delta.vercel.app/api/:path*', // Proxy to Backend
            },
        ];
    },
};

module.exports = nextConfig;
