const path = require('path')
// html生成
const HtmlWebpackPlugin = require('html-webpack-plugin')
// css提取
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 清理打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 控制台日志友好插件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// 匹配查找文件
const glob = require('glob')
const projectPath = process.cwd()
// 生成多页面配置
const setMPA = () => {
  const entrys = {}
  const HtmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(projectPath, './src/*/index.js'))
  // eslint-disable-next-line array-callback-return
  entryFiles.map((entryFile) => {
    const match = entryFile.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]
    entrys[pageName] = entryFile
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectPath, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      })
    )
  })
  return {
    entrys,
    HtmlWebpackPlugins
  }
}

// 获取多页面配置
const { entrys, HtmlWebpackPlugins } = setMPA()

module.exports = {
  // 入口文件，即需要处理的文件
  entry: entrys,
  // 输出文件配置
  output: {
    filename: '[name].js',
    path: path.join(projectPath, 'dist')
  },
  module: {
    rules: [
      // babel转义js
      {
        test: /\.js|jsx$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      // 从右向左解析css文件
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js")
              }
            }
          }
        ]
      },
      // 解析less文件
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js")
              }
            }
          }
        ]
      },
      // 图片
      {
        test: /.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[name]_[hash:8][ext]'
        }
      },
      // 字体
      {
        test: /.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[name]_[hash:8][ext]'
        }
      }
    ]
  },
  plugins: [
    // css提取
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin () {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          process.exit(1)
        }
      })
    }
  ].concat(HtmlWebpackPlugins),
  // 日志等级
  stats: 'errors-only'
}
