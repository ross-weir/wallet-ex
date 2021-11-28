import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletDetailsForm from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Wallet details form',
  component: WalletDetailsForm,
} as ComponentMeta<typeof WalletDetailsForm>;

const Template: ComponentStory<typeof WalletDetailsForm> = (args) => (
  <WalletDetailsForm {...args} />
);

export const WalletDetailsCompleted = Template.bind({});

WalletDetailsCompleted.args = {
  confirmButtonText: 'Create',
  cancelButtonText: 'Cancel',
};
