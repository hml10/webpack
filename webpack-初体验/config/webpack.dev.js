/*
  webpack配置文件
  开发环境指令：npx webpack-dev-server --config ./config/webpack.dev.js
  每次运行太麻烦了，把他放到package.json里面去  修改后运行指令为 npm start
*/
const {
  resolve
} = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry
  entry: "./src/js/index.js",
  // output
  output: {
    path: resolve(__dirname, "../build"), // 输出目录
    filename: "build.js" // 输出文件名
  },
  // loader
  module: {
    rules: [{
        test: /\.less$/,
        use: [
          // use数组执行顺序：从下到上、从右往左 (如果报错，下就完事) npm i less -D
          {
            loader: "style-loader" // 下载指令 npm i style-loader -D  从js文件中找到css字符串，并创建style标签插入页面中
          },
          {
            loader: "css-loader" // 下载指令 npm i css-loader -D  将 CSS 转化成 字符串，会以 CommonJS 模块化整合js文件中
          },
          {
            loader: "less-loader" // 下载指令 npm i less-loader -D  将 Less 编译成 CSS
          },

        ]
      },
      {
        //     11kb以下的图片会被base64处理 
        //     优点：图片不会发送额外的请求，随着html文件一起被请求下来（减少服务器压力）
        //     缺点：体积会变的更大
        //     所以一般针对小图片来做
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 11000, //  11kb以下的图片会被base64处理 

            // [ext] 原来文件扩展名是啥就是啥
            name: "[hash:10].[ext]", // [hash:10] hash值取10位
            esModule: false,
          }
        }]
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
      },
      {
        // 排除文件
        exclude: /\.(less|jpg|png|gif|js|html)$/,
        loader: 'file-loader',
        options: {
          name: "[hash:10].[ext]", // hash值取10位
        }
      }
    ]
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // mode
  mode: "development", // 开发环境

  // devServer 用来自动化
  //   npm i webpack-dev-server -D
  // 之前启动指令是：webpack （注意：这个启动指令不会加载devServer配置）
  // 要想启动devServer，必须使用 npx webpack-dev-server

  // webpack 和 webpack-dev-server的区别：
  //   1. 只有webpack-dev-server才能启动devServer配置，而webpack不行
  //   2. webpack-dev-server是在内存中构建，没有输出。 webpack会有输出到build下面 

  devServer: {
    contentBase: resolve(__dirname, '../build'), // 运行（构建后）代码的根目录
    compress: true, // 启动gzip压缩
    port: 3000, // 端口号
    host: 'localhost',
    open: true, // 自动打开浏览器
    // overlay: false, // 不要webpack错误在浏览器全屏提示
    quiet: true, // 不要打包打印信息
    // progress: true, // 进度条提示
  }
}