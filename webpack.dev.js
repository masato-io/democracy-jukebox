const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

console.log(__dirname);

module.exports = merge(common, {
	watch: true,
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './',
		historyApiFallback: true,
		proxy: {
			'/**': {
				target: 'http://localhost:3000',
				secure: false,
				changeOrigin: true
			}
		}
	}
});
