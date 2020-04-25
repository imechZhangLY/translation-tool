/**
 * @file 生产环境的webpack配置
 * @author zhangluyao01
 */
const TerserPlugin = require('terser-webpack-plugin');
const paths = require('./paths');

module.exports = {
    mode: 'production',
    output: {
        filename: 'main.js',
        path: paths.output
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
};
