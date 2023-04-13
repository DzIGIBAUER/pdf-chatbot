const CopyPlugin = require("copy-webpack-plugin")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
        new CopyPlugin({
            patterns: [
                {
                    from: './node_modules/pdf.js-extract/lib/pdfjs/pdf.worker.js',
                    to: './server/pages',
                },
            ],
        })
    )

    // Important: return the modified config
    return config
}
}

module.exports = nextConfig
