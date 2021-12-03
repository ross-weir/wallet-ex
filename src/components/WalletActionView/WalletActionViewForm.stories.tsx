import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletActionViewForm from './WalletActionViewForm';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Wallet Action View Form',
  component: WalletActionViewForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof WalletActionViewForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WalletActionViewForm> = () => (
  <WalletActionViewForm action="Restore" totalSteps={3} />
);

export const WalletAction = Template.bind({});

WalletAction.args = {};
