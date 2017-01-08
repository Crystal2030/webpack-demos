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

var pathToReact = path.join(__dirname, "./node_modules/react/dist/react.js");
var pathToReactDOM = path.join(__dirname, "./node_modules/react-dom/dist/react-dom.js");

var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry:
		'./src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	resolve:{
		extensions: ["", ".js",".jsx",".css",".json"],
		alias:{
			'react':pathToReact,
			'react-dom': pathToReactDOM
		}
	},
	loaders:[
		{
			test: /\.js$/,
			loaders: ['react-hot', 'babel'],
			exclude: path.resolve(__dirname, 'node_modules')
		},
		{ test: /\.css$/, loader: "style!css" }
		,
		{
			test: /\.less/,
			loader: 'style!css!less'
		},
		{
			test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000"
		}
	]
	,
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
		},
		plugins:[
			new HtmlWebpackPlugin({
				title: 'Crystal',
				template: './src/index.html'
			})
		]
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
