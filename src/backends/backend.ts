import { Wallet } from '../entities';
import { WalletInterfaceType } from '../walletInterfaces';

// Ideally the ops that result in a new db entry should follow the naming convention of the
// database fields so they can be inserted directly using json:
// https://github.com/diesel-rs/diesel/blob/master/examples/sqlite/all_about_inserts/src/lib.rs#L90

// TODO add coin-type so we support multiple coins?
export interface CreateWalletArgs {
  name: string;
  interface: WalletInterfaceType;
}

export interface GetWalletArgs {
  name: string;
  interface: WalletInterfaceType;
}

//
export interface StoreSecretKeyArgs {
  password: string;
  key: string;
}

export interface GetSecretKeyArgs {
  password: string;
}

export interface BackendOpErr {}

export type BackendOpResult<T> = Promise<T | BackendOpErr>;

export interface Backend {
  createWallet(args: CreateWalletArgs): BackendOpResult<Wallet>;
  getWallet(args: GetWalletArgs): BackendOpResult<Wallet>;

  // Not required when the Wallet interface is the type of a HW wallet
  // Should we encrypt it on the frontend? Tauri/react native/etc will all probably have ways to
  // store this data. Even browser based storages should work
  storeSecretKey(args: StoreSecretKeyArgs): BackendOpResult<void>;
  getSecretKey(args: GetSecretKeyArgs): BackendOpResult<string>;
}
