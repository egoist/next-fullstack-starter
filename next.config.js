module.exports = {
  future: {
    // webpack5: true,
  },
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
      for (const rule of config.module.rules) {
        if (rule.test && rule.test.test('foo.ts')) {
          rule.use = [].concat(rule.use, {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          })
        }
      }
    }

    return config
  },
}
