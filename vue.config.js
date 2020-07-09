const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    lintOnSave:false,//关闭语法检测
    devServer: {
        // server_name: 'www.crm.cc',
        open: true,
        proxy: {
            '/api': {
                // target: process.env.NODE_ENV === 'production' ? '/' : 'http://www.crm.cc',
                // target: 'http://api.epx.net',
                // target: 'http://api.crmhome.cc',
                // target: 'http://api.datuihome.com', 
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
    before(app) {
      app.get('/api/mockData', (req, res) => {
        res.json(mockData)
      })
      app.get('/api/main', (req, res) => {
        res.json(1)
      })
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
  assetsDir:process.env.NODE_ENV === 'production' ? './static/admin/style/' : '',
  // 配置部署服务器的设置
  // assetsDir: process.env.NODE_ENV === 'production' ? './static/admin/style/' : '',
  //不生成.map文件
  productionSourceMap: false,
  // vue路由按需加载 去除插件
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 对应package里的判断条件
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
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
      new CompressionWebpackPlugin({
        // 正在匹配需要压缩的文件后缀
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        // 大于10kb的会压缩
        threshold: 10240,
        // 其余配置查看compression-webpack-plugin
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      })
    )
  },
}
