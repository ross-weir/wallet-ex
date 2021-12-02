import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletRecoveryPhraseForm from './WalletRecoveryPhraseForm';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Wallet recovery phrase form',
  component: WalletRecoveryPhraseForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof WalletRecoveryPhraseForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WalletRecoveryPhraseForm> = (args) => (
  <WalletRecoveryPhraseForm {...args} />
);

export const WalletRecoveryPhraseStep = Template.bind({});

WalletRecoveryPhraseStep.args = {
  confirmButtonText: 'Continue',
  cancelButtonText: 'Cancel',
};
