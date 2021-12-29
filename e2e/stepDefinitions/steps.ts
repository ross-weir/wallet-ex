import { Given, Then } from '@wdio/cucumber-framework';

import WalletsListPage from '../pageObjects/walletsList.page';

const pages = {
  walletsList: WalletsListPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

Then(/I should see the add wallet button(.*)$/, async (page) => {
  await expect(WalletsListPage.btnAddWallet).toBeExisting();
});
