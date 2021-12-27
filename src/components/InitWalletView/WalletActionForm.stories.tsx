import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletActionForm from './WalletActionForm';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Wallet Action View Form',
  component: WalletActionForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof WalletActionForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WalletActionForm> = () => (
  <WalletActionForm action="Restore" totalSteps={3} />
);

export const WalletAction = Template.bind({});

WalletAction.args = {};
