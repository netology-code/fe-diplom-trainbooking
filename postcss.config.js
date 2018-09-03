module.exports = ({ file, options }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-import': { root: file.dirname },
    'postcss-cssnext': options.cssnext ? options.cssnext || {} : false,
    'autoprefixer': options.autoprefixer ? options.autoprefixer : false,
    'cssnano': options.cssnano || {}
  }
});
