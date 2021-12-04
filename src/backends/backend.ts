import { Wallet } from '../entities';
import { WalletInterfaceType } from '../walletInterfaces';

// TODO add coin-type so we support multiple coins?
export interface CreateWalletArgs {
  name: string;
  // does this need to be stored, it's only for encrypting the file that contains the private key?
  password: string;
  walletInterface: WalletInterfaceType;
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
