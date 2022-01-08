import { Given, Then, When } from '@wdio/cucumber-framework';
import { CreateWalletPage } from '../pageObjects';

const pages: Record<string, any> = {
  'Create Wallet': CreateWalletPage,
};

Given('I am on the {string} page', async (page: string) => {
  await pages[page].open();
});

Then('I should be on the wallet detail page', async () => {
  const onPage = await browser.waitUntil(async () => {
    const url = await browser.getUrl();
    const parts = url.split('/');

    return /^-?\d+$/.test(parts[parts.length - 1]);
  });

  expect(onPage).toBeTruthy();
});

When(
  'I create wallet with name {string} and password {string} and mnemonic passphrase {string}',
  async (name: string, password: string, mnemonicPass: string) => {
    await CreateWalletPage.completeForm(name, password, mnemonicPass);
  },
);
