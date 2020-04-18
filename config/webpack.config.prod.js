/**
 * @file 生产环境的webpack配置
 * @author zhangluyao01
 */
const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
    mode: 'production',
    output: {
        filename: 'main.js',
        path: paths.output
    },
    optimization: {}
};
