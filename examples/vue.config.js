/* eslint-disable */

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'ts']

const IS_PROD = process.env.NODE_ENV === 'production'
// const IS_PROD = false
const publicPath = process.env.VUE_APP_PUBLICPATH
const title = process.env.VUE_APP_TITLE

module.exports = {
    lintOnSave: false,
    publicPath: publicPath,
    configureWebpack: config => {
        if (IS_PROD) {
            config.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )

            // const terserPlugin = config.optimization.minimizer[0]
            // terserPlugin.options.terserOptions.compress.warnings = false
            // terserPlugin.options.terserOptions.compress.drop_debugger = true
            // terserPlugin.options.terserOptions.compress.drop_debugger = true
            // terserPlugin.options.terserOptions.compress.pure_funcs = ['console.log']
        } else {
            config.devtool = 'source-map'
        }
    }
}
