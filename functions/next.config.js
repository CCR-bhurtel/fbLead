/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    assetPrefix: '',
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
