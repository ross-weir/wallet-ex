import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Wallet } from '../../entities';

import WalletDetailCard from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Wallet detail card',
  component: WalletDetailCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof WalletDetailCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WalletDetailCard> = (args) => (
  <WalletDetailCard {...args} />
);

export const WalletDetailCardStory = Template.bind({});

const mockWallet: Wallet = {
  createdAt: '2021-12-06T03:04:43',
  id: 2,
  interface: 'local',
  name: 'Ergo Wallet',
};

WalletDetailCardStory.args = { wallet: mockWallet };
