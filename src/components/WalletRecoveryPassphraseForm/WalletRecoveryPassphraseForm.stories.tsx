import { ComponentMeta,ComponentStory } from '@storybook/react';

import WalletRecoveryPassphraseForm from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Wallet recovery passphrase form',
  component: WalletRecoveryPassphraseForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof WalletRecoveryPassphraseForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WalletRecoveryPassphraseForm> = () => (
  <WalletRecoveryPassphraseForm />
);

export const WalletRecoveryPassphraseFormStep = Template.bind({});

WalletRecoveryPassphraseFormStep.args = {};
