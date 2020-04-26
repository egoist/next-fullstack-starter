const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    // Specify the paths to all of the template files in your project
    content: ['./src/**/*.tsx'],

    // Some tags you probably will never use in JSX, but styles for them shold not be excluded
    whitelist: ['html', 'body'],

    // Include any special characters you're using in this regular expression
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
]

module.exports = {
  plugins: [
    'tailwindcss',
    process.env.NODE_ENV === 'production' && purgecss,
  ].filter(Boolean),
}
