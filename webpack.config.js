const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  target: 'node',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint:
        {
          failOnWarning: false,
          failOnError: false,
          fix: false,
          quiet: false
        }
      }
    })
  ]
}
