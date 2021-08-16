import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {

    entry: {
        "server": ["./index.ts"]
    },

    target: "node",
    mode: "production",

    node: {
        __dirname: false
    },

    // Set the naming convention of our bundles
    output: {
        libraryTarget: 'commonjs',
        filename: 'index.js',
        path: path.resolve(__dirname, '../lib')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".js", ".json"],
        modules: ['node_modules']
    },

    // Configure our module loaders
    module: {
        rules: [
            {
                test: /\.(exe)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }
                    },
                ]
            },
            {
                test: /\.ts?$/,
                include: path.resolve(__dirname, '../../'),
                loader: require.resolve("awesome-typescript-loader")
            },

            {
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('source-map-loader'),
                enforce: 'pre',
                include: path.resolve(__dirname, '../../server'),
            }
        ]
    },

    // Configure any plugins
    plugins: [

    ],
    performance: {
        hints: false,
    },
};

export default config;