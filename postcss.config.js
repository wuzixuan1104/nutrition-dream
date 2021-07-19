const env = process.env.NODE_ENV;
let extraPlugins = [];

if (env === 'production') {
  extraPlugins = [
    'postcss-css-variables',
    'autoprefixer',
  ];
}

module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-nested',
    'postcss-import',
    ...extraPlugins,
  ],
}
