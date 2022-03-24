import { invoke } from '@tauri-apps/api';

import { IAccount, IAddress, IWallet, Wallet } from '@/entities';
import { WalletExTable } from '@/storage/db';

export class WalletsTable implements WalletExTable<IWallet> {
  async toArray(): Promise<IWallet[]> {
    return invoke<IWallet[]>('list_wallets').then((objs) =>
      objs.map(Wallet.fromJson),
    );
  }

  async get(id: number): Promise<IWallet | undefined> {
    return invoke<IWallet>('find_wallet', { id }).then(Wallet.fromJson);
  }

  async add(obj: IWallet): Promise<number> {
    return invoke<IWallet>('create_wallet', { args: obj })
      .then(Wallet.fromJson)
      .then((w) => w.id);
  }
}

export class AccountsTable implements WalletExTable<IAccount> {
  toArray(): Promise<IAccount[]> {
    throw new Error('Method not implemented.');
  }

  get(id: number): Promise<IAccount | undefined> {
    throw new Error('Method not implemented.');
  }

  add(obj: IAccount): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

export class AddressesTable implements WalletExTable<IAddress> {
  toArray(): Promise<IAddress[]> {
    throw new Error('Method not implemented.');
  }

  get(id: number): Promise<IAddress | undefined> {
    throw new Error('Method not implemented.');
  }

  add(obj: IAddress): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
