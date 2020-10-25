const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: process.env.outputDir,
  productionSourceMap: false, // 关闭production模式的sourcemap
  publicPath: '/video/', // 部署服务器根目录
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src')
      }
    },
    optimization: {
      minimizer: [
        // 清除控制台
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      ]
    }
  },
  devServer: {
    compress: true,
    disableHostCheck: true // That solved it
  }
}
