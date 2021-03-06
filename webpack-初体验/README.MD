# webpack

一个静态模块打包工具

## 核心概念

1. entry 入口

- 以某个文件为入口开始打包

2. output 输出

- 打包后资源输出到哪里去

3. loader 加载器

- webpack 本身只能识别 json、js 模块，其他模块一旦加载就会报错
- 需要借助 loader 帮助 webpack 识别它识别不了的模块

4. plugins 插件

- loader 功能有限，要想做功能更加强大的工作交给插件

5. mode

- 模式：开发环境（development）和生产环境（production）

## 下载安装

- npm i webpack webpack-cli -g (全局安装)
- npm init -y (初始化包)
- npm i webpack webpack-cli -D (本地安装)

## 直接使用

- 运行 webpack 指令：`webpack ./src/js/index.js -o ./dist/js/index.js --mode=development`

  - 以 webpack 的开发环境运行，处理 ./src/js/index.js 文件，输出到 ./dist/js/index.js
  - 功能
    - 能将 ES6 模块化编译成浏览器识别的语法

- 运行 webpack 指令：`webpack ./src/js/index.js -o ./dist/js/index.js --mode=production`

  - 能将 ES6 模块化编译成浏览器识别的语法
  - 压缩 js 代码

- 问题：
  - 不能识别其他模块（less\css\html\jpg...）

## 通过配置文件使用

- webpack.config.js webpack 的配置文件

## 常见错误

错误一般只分析前面几行~

- `Module not found: Error: Can't resolve 'style-loader' in 'C:\Users\XiongJian\Desktop\class191108\05.项目构建\02.webpack'`
  - style-loader 模块没有找到
  - 下载安装：npm i style-loader -D
- `Error: Cannot find module 'less'`
  - less 模块没有找到
  - 下载安装：npm i less -D
- `xxx is not define`
  - 说明 xxx 没有定义
  - 定义或者引入

## 生产环境路径配置

- 问题：

  - css 文件和 html 文件不在同一个目录
  - css 文件和 html 文件中的图片都是被 url-loader 处理
  - 所以两个文件的图片路径必须是一样的
  - 所以导致至少有一个文件图片路径出现问题

- 解决
  - 用 / 路径 替换 ./ 相对路径
  - / 路径是以根目录出发，不管你在哪个文件夹，都以根目录为起点就不会有问题
  - 不能本地运行，需要开启服务器去服务器
  - npm i serve -g
  - serve build 以 build 为根目录启动一个服务器
