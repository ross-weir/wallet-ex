import { IAccount, IAddress, IWallet } from '@/entities';

export interface WalletExTable<T> {
  get(id: number): Promise<T | undefined>;
  add(obj: T): Promise<number>;
  toArray(): Promise<T[]>;
}

export interface IWalletExDatabase {
  wallets: WalletExTable<IWallet>;
  accounts: WalletExTable<IAccount>;
  addresses: WalletExTable<IAddress>;
}
