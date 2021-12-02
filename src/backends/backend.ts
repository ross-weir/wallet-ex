import { Wallet } from '../entities';
import { WalletInterfaceType } from '../walletInterfaces';

export interface CreateWalletArgs {
  name: string;
  password: string;
  walletInterface: WalletInterfaceType;
  // Not required if we're creating a wallet with a hardware backend
  mnemonic?: string;
}

export interface GetWalletArgs {
  name: string;
  password: string;
}

export interface WalletOpErr {}

export type WalletOpResult<T> = Promise<T | WalletOpErr>;

export interface Backend {
  createWallet(args: CreateWalletArgs): WalletOpResult<Wallet>;
  getWallet(args: GetWalletArgs): WalletOpResult<Wallet>;
}
