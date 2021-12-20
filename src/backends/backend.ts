import { Account, Address, Wallet } from '../entities';
import { WalletInterfaceType } from '../walletInterfaces';

// Ideally the ops that result in a new db entry should follow the naming convention of the
// database fields so they can be inserted directly using json:
// https://github.com/diesel-rs/diesel/blob/master/examples/sqlite/all_about_inserts/src/lib.rs#L90

// TODO add coin-type so we support multiple coins?
export interface CreateWalletArgs {
  name: string;
  interface: WalletInterfaceType;
}

export interface CreateAccountArgs {
  name: string;
  coinType: number;
  walletId: number;
}

//
export interface StoreSecretSeedArgs {
  password: string;
  seed: string;
}

export interface GetSecretSeedArgs {
  password: string;
}

export type BackendOpResult<T> = Promise<T>;

export interface Backend {
  createWallet(args: CreateWalletArgs): BackendOpResult<Wallet>;
  findWallet(id: number): BackendOpResult<Wallet>;
  // return type should also include pagination data
  listWallets(/** pagination */): BackendOpResult<Wallet[]>;

  createAccount(args: CreateAccountArgs): BackendOpResult<Account>;
  findAccount(id: number): BackendOpResult<Account>;

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
  getSecretSeed(args: GetSecretSeedArgs): BackendOpResult<string>;
}
