const mdColors = require('@egoist/md-colors')

module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        ...mdColors
      }
    },
  },
  variants: {},
  plugins: [],
}
