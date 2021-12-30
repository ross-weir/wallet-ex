import { Given, Then } from '@wdio/cucumber-framework';
import walletsListPage from '../pageObjects/walletsList.page';

import WalletsListPage from '../pageObjects/walletsList.page';

const pages: Record<string, any> = {
  walletsList: WalletsListPage,
};

Given(/^I am on the (\w+) page$/, async (page: string) => {
  await pages[page].open();
});

Then(/I should see the add wallet button(.*)$/, async (page) => {
  await expect(WalletsListPage.btnAddWallet).toBeExisting();
});
