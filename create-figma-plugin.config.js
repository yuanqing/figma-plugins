module.exports = function (config) {
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          injectType: 'styleTag'
        }
      },
      'css-loader'
    ]
  })
  return config
}
