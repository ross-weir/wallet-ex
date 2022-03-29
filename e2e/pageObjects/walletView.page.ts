import Page from './page';

class WalletViewPage extends Page {
  public get url(): string {
    return '/wallets';
  }

  public async createAccount(name: string, blockchain: string): Promise<void> {
    // add id to button element to open create account modal
  }
}

export default new WalletViewPage();
