const path = require('path')
const webpack = require('webpack');

module.exports = {
    publicPath: process.env.NODE_ENV == 'production' ? '/' :  '/',
    devServer: {
        // proxy: {
        //     '/proxy/': {
        //     // '': {
        //         target: process.env.VUE_APP_API_URL,
        //         pathRewrite: { '^/proxy': '' },
        //         ws: true,
        //         changeOrigin: true,
        //         secure: false,
        //     }
        // }
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,
    configureWebpack:  {
        resolve: {
            alias: {
                Assets: path.resolve(__dirname, 'src/assets/'),
                Views: path.resolve(__dirname, 'src/views/'),
                Libs: path.resolve(__dirname, 'src/libs/'),
            },
            extensions: ['*', '.js', '.vue', '.json']
        }
    }
}