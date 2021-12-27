import { ComponentStory, ComponentMeta } from '@storybook/react';

import InitWalletView from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Wallet Action View',
  component: InitWalletView,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InitWalletView>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InitWalletView> = () => (
  <InitWalletView />
);

export const WalletAction = Template.bind({});

WalletAction.args = {};
