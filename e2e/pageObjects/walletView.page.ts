import { ChainablePromiseElement } from 'webdriverio';
import { dropdownSelect } from '../utils';
import Page from './page';

class WalletViewPage extends Page {
  public get url(): string {
    return '/wallets';
  }

  public get btnAccountCreateModal(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('#accountCreateModalBtn');
  }

  public async createAccount(name: string, blockchain: string): Promise<void> {
    (await this.btnAccountCreateModal).click();

    await $('#accountName').setValue(name);
    await dropdownSelect('#blockchain', blockchain);

    const submitBtn = await $('#submit');
    await submitBtn.click();
  }

  public async getAccountDetails(): Promise<string[]> {
    const accountDetailEls = await $$('.accountDetail');
    const accountDetails = accountDetailEls.map((account) => account.getText());
    const results = await Promise.all(accountDetails);

    return results;
  }

  public async getAccountNames(): Promise<string[]> {
    const accountDetails = await this.getAccountDetails();

    return accountDetails.map((account) => account.split('\n')[0]);
  }
}

export default new WalletViewPage();
