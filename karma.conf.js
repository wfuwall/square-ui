// 获取 webpack 配置
const webpackConfig = require('@vue/cli-service/webpack.config')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    files: ['tests/**/*.spec.js'],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    autoWatch: true, // 自动监测文件变化

    webpack: webpackConfig,

    reporters: ['spec'],

    browsers: ['Chrome'] // 打开一个 Chrome 无头浏览器
  })
}
