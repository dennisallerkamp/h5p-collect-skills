const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = (nodeEnv === 'production');

module.exports = {
  mode: nodeEnv,
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress:{
            drop_console: true,
          }
        }
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'h5p-collect-skills.css'
    })
  ],
  entry: {
    dist: './src/entries/h5p-collect-skills.ts'
  },
  output: {
    filename: 'h5p-collect-skills.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: ['web', 'es5'], // IE11
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          { loader: "css-loader" },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(svg|jpg|png)$/,
        include: path.join(__dirname, 'src/images'),
        type: 'asset/resource'
      },
      {
        test: /\.woff$/,
        include: path.join(__dirname, 'src/fonts'),
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/scripts'),
      '@components': path.resolve(__dirname, 'src/scripts/components'),
      '@model': path.resolve(__dirname, 'src/scripts/model'),
      '@context': path.resolve(__dirname, 'src/scripts/context'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@hooks': path.resolve(__dirname, 'src/scripts/hooks'),
    },
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  stats: {
    colors: true
  },
  devtool: (isProd) ? undefined : 'eval-cheap-module-source-map'
};
