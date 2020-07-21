const path = require('path');
const paths = require('./config/paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // devtool: 'cheap-module-source-map',
    mode: 'production',
    entry: "./components/index.js",
    output: {
        path: path.resolve('build'),
        filename: 'main.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.tsx', '.ts', '.scss'],
        alias: {
            Src: path.resolve(__dirname, 'src/'),
            Layouts: path.resolve(__dirname, 'src/modules/Layouts')
        }
    },
    externals: {
        react: 'commonjs react',
        'react-dom': 'commonjs react-dom'
    }, 
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {test: /\.scss$/, use: [ 
                {loader: 'style-loader'},  // to inject the result into the DOM as a style block
                {loader: 'css-modules-typescript-loader'},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                {loader: 'css-loader', options: {modules: {localIdentName: '[local]-[hash:base64:5]'}}},  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                {loader: 'sass-loader'}  // to convert SASS to CSS
                // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
            ]}, 
            {
                test: /\.less$/,
                exclude: /\.module.(less)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './json/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
};