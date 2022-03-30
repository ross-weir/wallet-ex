import { CreateWalletPage } from '../pageObjects';

export const DEFAULT_WALLET_PASSWORD = 'testing123';

export const createAndLoginWallet = async (
  name: string,
  password?: string,
  mnemonicPass?: string,
) => {
  await CreateWalletPage.open();
  await CreateWalletPage.completeForm(
    name,
    password || DEFAULT_WALLET_PASSWORD,
    mnemonicPass || '',
  );

  return await browser.waitUntil(async () => {
    const url = await browser.getUrl();
    const parts = url.split('/');

    return /^-?\d+$/.test(parts[parts.length - 1]);
  });
};
