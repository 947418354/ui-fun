const webpack = require('webpack')

module.exports = {
  devServer: {
    proxy: {  // 跨域代理配置
      '/api': {
        target: 'http://localhost:7001/',  //跨域访问的接口地址
        changeOrigin: true,
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
        $: "jquery",
      }),
    ],
    resolve: {
      modules: ['./cus_node_modules', 'node_modules']
    },
  }
}