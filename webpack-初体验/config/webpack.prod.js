/*
  webpack配置文件
  提取css成单独文件 npm install --save-dev mini-css-extract-plugin 下载 引入
  压缩css指令 npm install --save-dev optimize-css-assets-webpack-plugin 下载 引入
  清空之前打包文件 npm i clean-webpack-plugin -D 下载 引入
  production模式 运行指令：npm run build（html压缩在下）
*/
const {
  resolve
} = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin"); // 清空之前打包文件 (解构赋值提取 暴露的是对象)

module.exports = {
  // entry
  entry: "./src/js/index.js",
  // output
  output: {
    path: resolve(__dirname, "../build"), // 输出目录
    filename: "static/js/[name].js", // 输出文件名(路径已修改在static下)
    publicPath: '/', // 公共引入资源路径(注意：本地运行有问题请看readme)
  },
  // loader
  module: {
    rules: [{
        test: /\.less$/,
        use: [
          // use数组执行顺序：从下到上、从右往左 (如果报错，下就完事) npm i less -D
          {
            // loader: "style-loader" // 下载指令 npm i style-loader -D  从js文件中找到css字符串，并创建style标签插入页面中
            loader: MiniCssExtractPlugin.loader, // 从js文件中找到css字符串，提取css成单独css文件
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
            name: "static/media/[hash:10].[ext]", // [hash:10] hash值取10位 (路径已修改在static下)
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
          name: "static/media/[hash:10].[ext]", // hash值取10位 (路径已修改在static下)
        }
      }
    ]
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      // 以 './src/index.html' 为模板创建新的html文件
      // 新html文件结构和原来一样 并且 会自动引入webpack打包生成的js/css资源
      template: './src/index.html',
      // minify 用来压缩 html
      minify: {
        collapseWhitespace: true, // 去除换行符/空格
        removeComments: true, // 去除注释
        removeRedundantAttributes: true, // 去除默认值标签属性
        removeScriptTypeAttributes: true, // 删除script type
        removeStyleLinkTypeAttributes: true, // 删除link type
        useShortDoctype: true // 使用短的doctype（html5）
      }
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css", //决定css的提取名字 (路径已修改在static下)
      // chunkFilename: "[id].css"
    }),
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.css$/g, // css 压缩
      // cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
      },
      // canPrint: true
    }),
    // 自动删除output.path输出目录的文件
    new CleanWebpackPlugin()
  ],
  // mode
  mode: "production", // 生产环境 运行指令：npm run build
}