const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
        tsconfigPath: path.join(".", "tsconfig.json"),
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
