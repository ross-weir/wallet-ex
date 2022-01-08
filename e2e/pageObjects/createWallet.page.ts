import { ChainablePromiseElement } from 'webdriverio';
import Page from './page';

class CreateWalletPage extends Page {
  public get url(): string {
    return '/wallets/add/create';
  }

  // Submits the current form, there's multiple forms that are filled out during creation
  public get btnSubmitForm(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('#submitWalletForm');
  }

  public async scrapeRecoveryPhrase(): Promise<string[]> {
    const mnemonics = await browser.waitUntil(async () => {
      const elems = await $$('.mnemonicWord');

      if (elems.length < 10) {
        return false;
      }

      return elems;
    });

    return Promise.all(
      mnemonics.map(async (child) =>
        child.getText().then((t) => t.split(' ')[1]),
      ),
    );
  }

  public async setWalletDetails(name: string, password: string) {
    await $('#name').setValue(name);
    await $('#password').setValue(password);
    await $('#passwordConfirm').setValue(password);

    (await this.btnSubmitForm).click();

    const mnemonics = await this.scrapeRecoveryPhrase();

    (await this.btnSubmitForm).click();

    // determine mnemonics
    // fill in fields
    // submit form
  }

  public async setMnemonicPassphrase(passphrase: string) {}
}

export default new CreateWalletPage();
