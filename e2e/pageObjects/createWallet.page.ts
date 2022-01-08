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

      // Hacky way to try and ensure mnemonics are loaded
      // Seemed to be an all or nothing type deal, either all word pills were there or none were
      // This seemed to work consistently
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

  public async completeForm(
    name: string,
    password: string,
    mnemonicPass: string,
  ) {
    // wallet details
    await $('#name').setValue(name);
    await $('#password').setValue(password);
    await $('#passwordConfirm').setValue(password);

    (await this.btnSubmitForm).click();

    // displayed wallet mnemonics
    const mnemonics = await this.scrapeRecoveryPhrase();

    (await this.btnSubmitForm).click();

    // confirm wallet mnemonics
    await this.completeMnemonic(mnemonics);

    (await this.btnSubmitForm).click();

    // enter mnemonic passphrase
    if (mnemonicPass) {
      await $('#mnemonicPassphrase').setValue(mnemonicPass);
      await $('#mnemonicPassphrase2').setValue(mnemonicPass);
    }

    (await this.btnSubmitForm).click();
  }

  public async completeMnemonic(mnemonics: string[]) {
    const word1Label = await $("[for='word1']");
    const word1Idx = parseInt((await word1Label.getText()).split(' ')[1]);
    await $('#word1').setValue(mnemonics[word1Idx - 1]);

    const word2Label = await $("[for='word2']");
    const word2Idx = parseInt((await word2Label.getText()).split(' ')[1]);
    await $('#word2').setValue(mnemonics[word2Idx - 1]);

    const word3Label = await $("[for='word3']");
    const word3Idx = parseInt((await word3Label.getText()).split(' ')[1]);
    await $('#word3').setValue(mnemonics[word3Idx - 1]);
  }
}

export default new CreateWalletPage();
