import { ChainablePromiseElement } from 'webdriverio';
import Page from './page';

class WalletsListPage extends Page {
  public get btnAddWallet(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $(
      '#root > div.ui.text.container > div.ui.two.column.grid > div:nth-child(2) > button',
    );
  }

  public open(): Promise<string> {
    return super.open('wallets');
  }
}

export default new WalletsListPage();
