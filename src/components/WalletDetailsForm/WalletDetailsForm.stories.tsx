import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletDetailsForm from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Wallet details form',
  component: WalletDetailsForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof WalletDetailsForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WalletDetailsForm> = (args) => (
  <WalletDetailsForm {...args} />
);

export const WalletDetailsCompleted = Template.bind({});

WalletDetailsCompleted.args = { buttonText: 'Create' };
