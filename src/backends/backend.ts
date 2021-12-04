import { Wallet } from '../entities';
import { WalletInterfaceType } from '../walletInterfaces';

// Ideally the ops that result in a new db entry should follow the naming convention of the
// database fields so they can be inserted directly using json:
// https://github.com/diesel-rs/diesel/blob/master/examples/sqlite/all_about_inserts/src/lib.rs#L90
// TODO add coin-type so we support multiple coins?
export interface CreateWalletArgs {
  name: string;
  // does this need to be stored, it's only for encrypting the file that contains the private key?
  password: string;
  interface: WalletInterfaceType;
  // Not required if we're creating a wallet with a hardware interface
  mnemonic?: string;
}

export interface GetWalletArgs {
  name: string;
  password: string;
}

export interface BackendOpErr {}

export type BackendOpResult<T> = Promise<T | BackendOpErr>;

export interface Backend {
  createWallet(args: CreateWalletArgs): BackendOpResult<Wallet>;
  getWallet(args: GetWalletArgs): BackendOpResult<Wallet>;
}
