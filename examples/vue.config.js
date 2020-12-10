

const IS_PROD = process.env.NODE_ENV === 'production'
// const IS_PROD = false
const publicPath = process.env.VUE_APP_PUBLICPATH
const title = process.env.VUE_APP_TITLE

module.exports = {
    lintOnSave: false,
    publicPath: publicPath,
}
