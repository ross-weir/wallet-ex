import { invoke } from '@tauri-apps/api';

import { Account, IAccount, IWallet, Wallet } from '@/entities';
import { IWalletExDatabase } from '@/storage/db';

export class TauriDatabase implements IWalletExDatabase {
  async accountsForWallet(walletId: number): Promise<Account[]> {
    return invoke<IAccount[]>('accounts_for_wallet', { walletId }).then(
      (objs) => objs.map(Account.fromJson),
    );
  }

  async findAccount(id: number): Promise<Account | undefined> {
    return invoke<IAccount>('find_account', { id }).then(Account.fromJson);
  }

  async createAccount(obj: Account): Promise<number> {
    return invoke<IAccount>('create_account', { args: obj })
      .then(Account.fromJson)
      .then((w) => w.id);
  }

  async listWallets(): Promise<Wallet[]> {
    return invoke<IWallet[]>('list_wallets').then((objs) =>
      objs.map(Wallet.fromJson),
    );
  }

  async createWallet(obj: Wallet): Promise<number> {
    return invoke<IWallet>('create_wallet', { args: obj })
      .then(Wallet.fromJson)
      .then((w) => w.id);
  }

  async findWallet(id: number): Promise<Wallet | undefined> {
    return invoke<IWallet>('find_wallet', { id }).then(Wallet.fromJson);
  }
}
