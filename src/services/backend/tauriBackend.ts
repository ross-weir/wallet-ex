import { invoke, path, fs } from '@tauri-apps/api';
import localforage from 'localforage';
import { injectable } from 'tsyringe';
import { AesCrypto, checkPassword, EncryptResult } from '../../crypto';
import { Account, Address, Wallet } from '../../entities';
import { toBase16 } from '../../utils/formatting';
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

const storageKeyForWallet = async (wallet: Wallet): Promise<string> => {
  const key = new TextEncoder().encode(`${wallet.id}-${wallet.createdAt}`);
  const hashedKey = await crypto.subtle.digest('SHA-256', key);

  return toBase16(new Uint8Array(hashedKey));
};

@injectable()
export class TauriBackend implements BackendService {
  private readonly aes = AesCrypto.default();

  async readConfig(): BackendOpResult<string> {
    return fs.readTextFile(await cfgPath());
  }

  async writeConfig(cfg: string): BackendOpResult<void> {
    const file = { contents: cfg, path: await cfgPath() };
    return fs.writeFile(file);
  }

  createAddress(args: CreateAddressArgs): BackendOpResult<Address> {
    return invoke('create_address', { args });
  }

  addressesForAccount(accountId: number): BackendOpResult<Address[]> {
    return invoke('addresses_for_account', { accountId });
  }

  createAccount(args: CreateAccountArgs): BackendOpResult<Account> {
    return invoke('create_account', { args });
  }

  findAccount(id: number): BackendOpResult<Account> {
    return invoke('find_account', { id });
  }

  accountsForWallet(walletId: number): BackendOpResult<Account[]> {
    return invoke('accounts_for_wallet', { walletId });
  }

  listWallets(): BackendOpResult<Wallet[]> {
    return invoke('list_wallets');
  }

  createWallet(args: CreateWalletArgs): BackendOpResult<Wallet> {
    return invoke('create_wallet', { args });
  }

  findWallet(id: number): BackendOpResult<Wallet> {
    return invoke('find_wallet', { id });
  }

  async storeSecretSeed({
    wallet,
    password,
    seed,
  }: StoreSecretSeedArgs): BackendOpResult<void> {
    const storageKey = await storageKeyForWallet(wallet);
    const encryptedSeedResult = await this.aes.encrypt({
      password,
      data: seed,
    });

    localforage.setItem(storageKey, encryptedSeedResult);
  }

  async getSecretSeed({
    wallet,
    password,
  }: GetSecretSeedArgs): BackendOpResult<Uint8Array> {
    const storageKey = await storageKeyForWallet(wallet);
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
