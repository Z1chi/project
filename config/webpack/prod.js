const paths = require('../paths');
const {merge} = require('webpack-merge');
const common = require('./common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
    mode: 'production',

    entry: {
        index: {
            import: `${paths.src}/index.js`,
            dependOn: ['react', 'helpers']
        },
        react: ['react', 'react-dom', 'prop-types'],
        helpers: ['immer', 'nanoid']
    },
    devtool: false,
    output: {
        filename: 'js/[name].[contenthash].bundle.js',
        publicPath: '../../affiliate/',
        assetModuleFilename: 'media/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1}
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource'
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),

    ],
    optimization: {
        runtimeChunk: 'single'
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});