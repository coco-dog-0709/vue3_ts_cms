module.exports = {
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        views: '@/views'
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://123.207.32.32:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    },
    port: 7777
  }
}
