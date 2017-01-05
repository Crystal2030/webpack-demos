//# 请注意webpack.config.js这个文件命名，默认情况下需要严格按照这个命名，不然会报Output filename not configured的错误；
// 另外，如果不按这个命名，那么在webpack运行的时候通过--conf这个参数指定配置文件，比如：webpack --config conf.js
var path  = require('path');

function rewriteUrl(replacePath) {
	return function (req, opt) {
		var queryIndex = req.url.indexOf('?');
		var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";

		req.url = req.path.replace(opt.path, replacePath) + query;
		console.log("rewriting ", req.originalUrl, req.url);
	};
}

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	devServer:{
		publicPath: "/static/",
		stats: {colors: true},
		port: 3000,
		contentBase: 'build',
		inline: true,
		proxy: {
			// '/api':{
				// target: 'https://other-server.example.com',
				// rewrite: rewriteUrl('/$1\.json'),
				// pathRewrite: {'^/api' : ''}
				// changeOrigin: true
			// }
		}
	},
	module: {
		loaders:[
			{
				test:/\.js$/,
				loader: 'babel-loader'
			}
		]
	}
}
