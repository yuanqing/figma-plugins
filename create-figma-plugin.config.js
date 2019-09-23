module.exports = function (config) {
  config.module.rules.push({
    test: /\.js?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              pragma: 'h',
              pragmaFrag: 'Fragment'
            }
          ]
        ]
      }
    }
  })
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
