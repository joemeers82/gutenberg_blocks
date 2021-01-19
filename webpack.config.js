const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin  = require('eslint-webpack-plugin');
const webpack       = require('webpack');
const path          = require('path');

module.exports = (env, argv) => {
    function isDevelopment() {
        return argv.mode === "development";
    }
    var config = {
        entry: {
            editor: "./src/editor.js",
            script: "./src/script.js"
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        sourceMap: true    
                    }
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: true
                        }
                    }
                })
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new ESLintPlugin(),
            new MiniCSSExtractPlugin({
                chunkFilename: "[id.css",
                filename: chunkData => {
                    return chunkData.chunk.name === "script"
                        ? "style.css"
                        : "[name].css";
                }
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            })
        ],
        devtool: isDevelopment() ? "cheap-module-source-map" : "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                plugins: ["@babel/plugin-proposal-class-properties"],
                                presets: [
                                    "@babel/preset-env",
                                    [
                                        "@babel/preset-react",
                                        {
                                            pragma: "wp.element.createElement",
                                            pragmaFrag: "wp.element.Fragment",
                                            development: isDevelopment()
                                        }
                                    ]
                                ]
                            }
                        },
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer()]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                }
            ]
        },
        externals: {
            jquery: "jQuery",
            lodash: "lodash",
            "@wordpress/blocks": ["wp", "blocks"],
            "@wordpress/i18n": ["wp", "i18n"],
            "@wordpress/block-editor" : ["wp", "blockEditor"],
            "@wordpress/components" : ["wp", "components"],
            "@wordpress/element"   : ["wp", "element"],
            "@wordpress/blob"   : ["wp", "blob"],
            "@wordpress/data"   : ["wp", "data"],
        }
    };
    return config;
};
