const webpack = require('webpack')
const UglifyESPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
console.log('当前环境：', process.env.NODE_ENV)
console.log('当前baseUrl：', process.env.VUE_APP_LOACTION)
const isProduction = process.env.NODE_ENV !== 'development'
// 是否使用cdn
const openCdn = isProduction && true
// CDN外链，会插入到index.html中
const cdn = {
  css: [
    'https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/theme-chalk/index.css',
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.2/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.4/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js',
    'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js',
  ],
}
// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'element-ui': 'ELEMENT',
  jquery: 'jQuery',
}
module.exports = {
  publicPath: isProduction ? './' : '/',
  lintOnSave: false, //关闭语法检测
  devServer: {
    open: true,
    proxy: {
      '/ai': {
        // target: 'http://120.27.63.9:8080',
        // target: 'http://dongpei.kaifa',
        // target: 'http://sc.dp.com', //超
        target: 'http://admin.bqjy.com', //李博文
        // target: 'http://thing.com',
        // target: 'http://testadmin.beiqujy.com/apidata', //测试
        // target: 'http://thing.com',
        // target: 'http://testadmin.beiqujy.com/apidata', //测试
        // target: 'http://dpadmin.beiqujy.com/apidata', //测试
        //target: 'http://dongpei.local', //孝华
        // target: 'http://a.cc',
        // target: 'http://www.beiqujy.com/apidata',
        // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/ai': '/',
        },
      },
    },
  },
  // 全局配置css文件
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/css/global_var.scss";`,
      },
    },
  },
  configureWebpack: {
    // 覆盖webpack默认配置的都在这里

    resolve: {
      // 配置解析别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@h': path.resolve(__dirname, './src/assets/hotcss'),
        '@s': path.resolve(__dirname, './src/assets/style'),
        '@i': path.resolve(__dirname, './src/assets/images'),
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      }),
      config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugin('html').tap((args) => {
      if (openCdn) {
        args[0].cdn = cdn
      }
      return args
    })
    // 对应package里的判断条件
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    if (isProduction) {
      // 给js和css配置版本号
      const Timestamp = new Date().getTime()
      config.output.filename('js/[name].' + Timestamp + '.js').end()
      config.output.chunkFilename('js/[name].' + Timestamp + '.js').end()
      config.plugin('extract-css').tap((args) => [
        {
          filename: `css/[name].${Timestamp}.css`,
          chunkFilename: `css/[name].${Timestamp}.css`,
        },
      ])
    }
  },
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (openCdn) {
      // externals
      config.externals = externals
    }
    // 启动gzip压缩
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
          },
          parallel: true,
          cache: true,
        },
      })
    )
  },
}
