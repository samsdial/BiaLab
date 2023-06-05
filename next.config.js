/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'https:/flagcdn.com/',
                port: '',
                pathname: '/w320/**',
            },
        ],
    },
}

module.exports = nextConfig
