/** @type {import('next').NextConfig} */
const CopyPlugin = require('copy-webpack-plugin')

const nextConfig = {
  output: 'export',
  webpack(config) {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    config.plugins = [
      ...config.plugins,
      new CopyPlugin({

        // TODO: change back to esm when ffmpeg wasm gets update.
        patterns: [
          {
            from: "./node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.js",
            to: "./static/chunks/ffmpeg-core.js"
          },
          {
            from: "./node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.wasm",
            to: "./static/chunks/"
          }
        ],
      }),
    ];

    config.module.rules.push({
      test: /\.wasm$/,
      loader: "encoded-uint8array-loader",
      type: "javascript/auto",
    })
    return config
  }
}

module.exports = nextConfig
