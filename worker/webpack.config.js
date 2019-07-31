module.exports = {
  entry: './worker/worker.js',
  mode: 'development',
  output: {
    pathinfo: false,
  },
  devtool: 'none',
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
    removeEmptyChunks: false,
    removeAvailableModules: false,
    mergeDuplicateChunks: false,
  },
}
