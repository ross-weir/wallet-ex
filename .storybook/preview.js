export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\.js?$/,
  //     use: [
  //       {
  //         options: { envName: 'esm' },
  //         loader: require.resolve('babel-loader'),
  //       },
  //     ],
  //     exclude: /node_modules\/(?!(loki)\/).*/, // Loki is not transpilled, throws error in IE 11
  //   });

  //   return config;
  // },
};
