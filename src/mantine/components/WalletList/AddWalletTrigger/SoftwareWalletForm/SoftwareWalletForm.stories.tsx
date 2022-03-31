import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SoftwareWalletForm } from './SoftwareWalletForm';

export default {
  title: 'Add wallet form',
  component: SoftwareWalletForm,
} as ComponentMeta<typeof SoftwareWalletForm>;

const Template: ComponentStory<typeof SoftwareWalletForm> = () => (
  <SoftwareWalletForm
    onSubmit={console.log}
    action="create"
    onCancel={() => null}
  />
);

export const SoftwareWalletFormStory = Template.bind({});

SoftwareWalletFormStory.args = {};
