module.exports = function (config) {
  config.module.rules[0].use.options.plugins.push([
    '@babel/plugin-transform-react-jsx',
    {
      pragma: 'h',
      pragmaFrag: 'Fragment'
    }
  ])
  config.module.rules.push({
    test: /\.s?css$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          injectType: 'styleTag'
        }
      },
      'css-loader',
      'sass-loader'
    ]
  })
  return config
}
