/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
    i18n: {
        locales: ['ru'],
        defaultLocale: 'ru',
    },
    productionBrowserSourceMaps: true,
    // Включаем транспиляцию
    transpilePackages: ['@vkontakte/vkui'],

    // Трансформируем импорты
    modularizeImports: {
        '@vkontakte/vkui': {
            transform: '@vkontakte/vkui/dist/cssm',
            skipDefaultConversion: true,
        },
    },
}

module.exports = nextConfig