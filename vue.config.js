module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: { alias: { 'vue$': 'vue/dist/vue.runtime.esm.js' } },
    module: {
      rules: [{ test: /\.coffee$/, use: 'coffee-loader'}]
    }
  }
}
