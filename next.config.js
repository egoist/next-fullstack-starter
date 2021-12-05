module.exports = {
  webpack(config, { dev, isServer }) {
    // Replace React with Preact in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    if (isServer) {
      config.module.rules.push({
        loader: 'ts-loader',
        test: /\.ts$/,
        exclude: [/node_modules/],
        enforce: 'pre',
        options: {
          transpileOnly: true,
        },
      })
    }

    return config
  },
}
