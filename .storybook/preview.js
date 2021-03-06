import 'semantic-ui-css/semantic.min.css';

import { i18n } from './i18next.js';

export const parameters = {
  i18n,
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
