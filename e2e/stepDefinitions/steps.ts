import { Given, Then, When } from '@wdio/cucumber-framework';
import { CreateWalletPage } from '../pageObjects';

const pages: Record<string, any> = {
  'Create Wallet': CreateWalletPage,
};

Given('I am on the {string} page', async (page: string) => {
  await pages[page].open();
});

When(
  'I enter wallet name {string} and password {string}',
  async (name: string, password: string) => {
    await CreateWalletPage.setWalletDetails(name, password);
  },
);
