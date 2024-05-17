
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ThreeMinifierPlugin = require("@yushijinhun/three-minifier-webpack");
const threeMinifier = new ThreeMinifierPlugin();
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode: mode,
    devtool: (mode === 'development') ? 'inline-source-map' : false,
    performance: {
        hints: false
    },
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[fullhash:8].js',
        sourceMapFilename: '[name].[fullhash:8].map',
        chunkFilename: '[id].[fullhash:8].js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        plugins: [
            threeMinifier.resolver,
        ]
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/i,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.(gltf|bin|glb|obj)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, `src/assets/`),
                    to: path.join(__dirname, `build/assets/`)
                },
            ],
        }),
        new CleanWebpackPlugin(),
        threeMinifier,
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
