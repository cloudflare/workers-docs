module.exports = {
  entry: './workers-site/index.js',
  mode: 'development',
  output: {
    pathinfo: false,
  },
  devtool: 'none',
  optimization: {
    // We do not want to minimize our code.
    minimize: false,
    removeEmptyChunks: false,
    removeAvailableModules: false,
    mergeDuplicateChunks: false,
  },
}