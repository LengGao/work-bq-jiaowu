const webpack = require('webpack')
const UglifyESPlugin = require('uglifyjs-webpack-plugin')
const path = require("path");
function resolve (dir) {
  return path.join(__dirname, '..', dir)
  }
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,//关闭语法检测
  devServer: {
    // server_name: 'www.crm.cc',
    open: true,
    proxy: {
      '/api': {
        target: 'http://api.video.cn/',
        // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/api': '/'
        }
      },
    },
  },
  // 全局配置css文件
  css: {
    loaderOptions: {
      sass: {
        data: `
              @import "@/assets/css/global_var.scss";
            `,
      },
    },
  },
  configureWebpack: {  // 覆盖webpack默认配置的都在这里
    resolve: {   // 配置解析别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@h': path.resolve(__dirname, './src/assets/hotcss'),
        '@s': path.resolve(__dirname, './src/assets/style'),
        '@i': path.resolve(__dirname, './src/assets/images'),
      }
    }
  },
  chainWebpack:(config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
       .test( /\.svg$/)
       .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
         symbolId: 'icon-[name]'
     });

    // config.module.rules.delete("svg");
    // config.module
    //     .rule('svg-smart')
    //     .test(/\.svg$/)
    //     .include
    //     .add(resolve('src/icons/svg'))
    //     .end()
    //     .use('svg-sprite-loader')
    //     .loader('svg-sprite-loader')
    //     .options({
    //         symbolId:'icon-[name]'
    //     })
},
  productionSourceMap: true,
 

  // 启动gzip压缩
  configureWebpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      })
    )
    // 开发环境不需要gzip
    if (process.env.NODE_ENV !== 'production') return
    config.plugins.push(
      new UglifyESPlugin({
        // 多嵌套了一层
        uglifyOptions: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
          }
        }
      })
    )
  },
}
