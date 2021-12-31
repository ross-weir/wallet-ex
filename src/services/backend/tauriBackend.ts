import { invoke, path, fs } from '@tauri-apps/api';
import localforage from 'localforage';
import { injectable } from 'tsyringe';
import { AesCrypto, checkPassword, EncryptResult } from '../../crypto';
import {
  BackendService,
  CreateWalletArgs,
  BackendOpResult,
  GetSecretSeedArgs,
  StoreSecretSeedArgs,
  CreateAccountArgs,
  CreateAddressArgs,
} from './backend';

const cfgPath = async () => {
  const appDir = await path.appDir();
  return `${appDir}${path.sep}.wallet-x.json`;
};

@injectable()
export class TauriBackend extends BackendService {
  private readonly aes = AesCrypto.default();

  async readConfig(): BackendOpResult<string> {
    return fs.readTextFile(await cfgPath());
  }

  async writeConfig(cfg: string): BackendOpResult<void> {
    const file = { contents: cfg, path: await cfgPath() };
    return fs.writeFile(file);
  }

  createAddress(args: CreateAddressArgs): BackendOpResult<any> {
    return invoke('create_address', { args });
  }

  addressesForAccount(accountId: number): BackendOpResult<any[]> {
    return invoke('addresses_for_account', { accountId });
  }

  createAccount(args: CreateAccountArgs): BackendOpResult<any> {
    return invoke('create_account', { args });
  }

  findAccount(id: number): BackendOpResult<any> {
    return invoke('find_account', { id });
  }

  accountsForWallet(walletId: number): BackendOpResult<any[]> {
    return invoke('accounts_for_wallet', { walletId });
  }

  listWallets(): BackendOpResult<any[]> {
    return invoke('list_wallets');
  }

  createWallet(args: CreateWalletArgs): BackendOpResult<any> {
    return invoke('create_wallet', { args });
  }

  findWallet(id: number): BackendOpResult<any> {
    return invoke('find_wallet', { id });
  }

  async storeSecretSeed({
    storageKey,
    password,
    seed,
  }: StoreSecretSeedArgs): BackendOpResult<void> {
    const encryptedSeedResult = await this.aes.encrypt({
      password,
      data: seed,
    });

    localforage.setItem(storageKey, encryptedSeedResult);
  }

  async getSecretSeed({
    storageKey,
    password,
  }: GetSecretSeedArgs): BackendOpResult<Uint8Array> {
    const decryptParams = await localforage.getItem<EncryptResult>(storageKey);

    if (!decryptParams) {
      throw new Error('backend: failed to find encrypted seed data for wallet');
    }

    return await this.aes.decrypt({
      password,
      data: decryptParams.cipherText,
      iv: decryptParams.iv,
      salt: decryptParams.salt,
    });
  }

  async checkCredentialsForWallet(
    walletId: number,
    args: Record<string, any>,
  ): BackendOpResult<boolean> {
    if (!args.password) {
      console.warn(
        'TauriBackend: "password" field is required to check wallet credentials',
      );

      return false;
    }

    const walletPassword = await invoke<string>('get_wallet_password', {
      walletId,
    });

    return checkPassword(args.password, walletPassword);
  }

  async storeData<T>(descriptor: string, data: T): BackendOpResult<T> {
    return localforage.setItem(descriptor, data);
  }

  async getStoredData<T>(
    descriptor: string,
  ): BackendOpResult<T | undefined | null> {
    return localforage.getItem(descriptor);
  }
}
