import { Account, Address, Wallet } from '../../entities';
import { WalletInterfaceType } from '../../walletInterfaces';

export interface CreateWalletArgs {
  name: string;
  interface: WalletInterfaceType;
}

export interface CreateAccountArgs {
  name: string;
  coinType: number;
  walletId: number;
}

export interface CreateAddressArgs {
  address: string;
  deriveIdx: number;
  accountId: number;
}

export interface StoreSecretSeedArgs {
  password: string;
  seed: Uint8Array;
  // used to calculate where to store the key
  wallet: Wallet;
}

export interface GetSecretSeedArgs {
  password: string;
  wallet: Wallet;
}

export type BackendOpResult<T> = Promise<T>;

export interface BackendService {
  createWallet(args: CreateWalletArgs): BackendOpResult<Wallet>;
  findWallet(id: number): BackendOpResult<Wallet>;
  // return type should also include pagination data
  listWallets(/** pagination */): BackendOpResult<Wallet[]>;

  createAccount(args: CreateAccountArgs): BackendOpResult<Account>;
  findAccount(id: number): BackendOpResult<Account>;
  accountsForWallet(
    walletId: number /**, pagination */,
  ): BackendOpResult<Account[]>;

  createAddress(args: CreateAddressArgs): BackendOpResult<Address>;
  // would prefer this to be a filter on `listAddresses` but not sure how to do dynamic queries yet
  addressesForAccount(
    accountId: number /**, pagination */,
  ): BackendOpResult<Address[]>;

  readConfig(): Promise<string>;
  writeConfig(cfg: string): Promise<void>;

  // Not required when the Wallet interface is the type of a HW wallet
  // Should we encrypt it on the frontend? Tauri/react native/etc will all probably have ways to
  // store this data. Even browser based storages should work
  storeSecretSeed(args: StoreSecretSeedArgs): BackendOpResult<void>;
  getSecretSeed(args: GetSecretSeedArgs): BackendOpResult<Uint8Array>;
}
