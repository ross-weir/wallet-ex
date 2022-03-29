import { Given } from '@wdio/cucumber-framework';
import { CreateWalletPage } from '../pageObjects';
import walletViewPage from '../pageObjects/walletView.page';
import { createAndLoginWallet } from '../utils/wallets';

Given('I am logged in to wallet {string}', async (name: string) => {
  const loggedIn = await createAndLoginWallet(name);

  if (!loggedIn) {
    throw new Error('Failed to login to wallet');
  }

  console.log('testing');
});
