import { Given, Then, When } from '@wdio/cucumber-framework';
import { WalletViewPage } from '../pageObjects';
import { createAndLoginWallet } from '../utils/entities';

Given('I am logged in to wallet {string}', async (name: string) => {
  const loggedIn = await createAndLoginWallet(name);

  if (!loggedIn) {
    throw new Error('Failed to login to wallet');
  }
});

When(
  'I create an account called {string} on blockchain {string}',
  async (accountName: string, blockchainName: string) => {
    await WalletViewPage.createAccount(accountName, blockchainName);
  },
);

Then('I should see the account {string}', async (accountName: string) => {
  const accountNames = await WalletViewPage.getAccountNames();

  if (!accountNames.includes(accountName)) {
    throw new Error(`Unable to find account with name: ${accountName}`);
  }
});
