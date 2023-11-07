/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack(config) {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    config.module.rules.push({
      test: /\.wasm$/,
      loader: "encoded-uint8array-loader",
      type: "javascript/auto",
    })
    return config
  }
}

module.exports = nextConfig
