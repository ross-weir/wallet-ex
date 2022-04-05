// const { webpack } = require('../craco.config');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    'storybook-react-i18next',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    return webpack.configure(config);
  },
};
