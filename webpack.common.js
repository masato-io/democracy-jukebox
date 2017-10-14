const path = require('path');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve('./public')
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
        query: {
          classIdPrefix: '[name]-[hash:8]__',

          propsMap: {
            fillRule: 'fill-rule'
          },
          xmlnsTest: /^xmlns.*$/
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
          {
            loader: 'file-loader',
            options: {}
          }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
