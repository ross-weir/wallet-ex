import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletActionView from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Wallet Action View',
  component: WalletActionView,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof WalletActionView>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WalletActionView> = () => (
  <WalletActionView />
);

export const WalletAction = Template.bind({});

WalletAction.args = {};
