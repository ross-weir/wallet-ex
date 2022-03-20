const { addBeforeLoader, loaderByName } = require('@craco/craco');
const webpack = require('webpack');
const tauriConfig = require('./src-tauri/tauri.conf.json');

module.exports = {
  babel: {
    plugins: ['babel-plugin-transform-typescript-metadata'],
  },
  webpack: {
    configure(webpackConfig) {
      const wasmExtensionRegExp = /\.wasm$/;
      webpackConfig.resolve.extensions.push('.wasm');

      webpackConfig.module.rules.forEach((rule) => {
        (rule.oneOf || []).forEach((oneOf) => {
          if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
            oneOf.exclude.push(wasmExtensionRegExp);
          }
        });
      });

      const wasmLoader = {
        test: wasmExtensionRegExp,
        exclude: /node_modules/,
        loaders: ['wasm-loader'],
      };

      addBeforeLoader(webpackConfig, loaderByName('file-loader'), wasmLoader);

      webpackConfig.plugins.push(
        new webpack.ContextReplacementPlugin(/ergo-lib-wasm-browser/),
      );

      // avoid using tauris async api by baking in the bundle
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(tauriConfig.package.version),
        }),
      );

      return webpackConfig;
    },
  },
};
