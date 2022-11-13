/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['oaidalleapiprodscus.blob.core.windows.net', 'www.fillmurray.com'], }
}

module.exports = nextConfig
