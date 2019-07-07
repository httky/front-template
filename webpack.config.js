import webpack from 'webpack';
import config from './config';

const webpackConfig = {
  output: {
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_CONFIG: JSON.stringify(config.constants),
      APP_ENV: JSON.stringify(config.env),
    }),
  ],
  // webpack4
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /node_modules|src\/scripts\/modules|src\/scripts\/components|_config.js/,
  //         name: "common",
  //         chunks: "all",
  //         enforce: true,
  //       },
  //     },
  //   }
  // },
};

if (config.settings.script.sourcemap === true) {
  webpackConfig.devtool = 'source-map';
}

webpackConfig.mode = config.env === 'dev' ? 'development' : 'production'; // webpack4

export default webpackConfig;
