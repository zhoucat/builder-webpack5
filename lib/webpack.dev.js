const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const devConfig = {
  // 模式,设置process.env.NODE_ENV的值，不设置默认为production
  mode: 'development',
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // 热更新目录
    contentBase: './dist',
    // 开启时自动引入HotModuleReplacementPlugin插件
    hot: true,
    host: '0.0.0.0',
    // 端口号
    port: 8080,
    injectHot: true,
    stats: 'errors-only'
  },
  // sourcemap
  devtool: 'source-map',
  // 监听配置
  watchOptions: {
    // 默认为空，不监听的文件或者文件夹，支持正则
    ignored: '/node_modules/',
    // 监听到变化后多久执行
    aggregateTimeout: 200,
    // 判断文件变化是通过不断地轮训来查看指定文件是否变化,毫秒为单位，默认为1000，设置为true则开启默认
    poll: 1000
  }
}

module.exports = merge(baseConfig, devConfig)
