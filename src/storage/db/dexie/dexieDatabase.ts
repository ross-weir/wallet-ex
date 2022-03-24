import Dexie, { Table } from 'dexie';

import { Account, Address, Wallet } from '@/entities';
import { IWalletExDatabase } from '@/storage/db';

export class DexieDatabase extends Dexie implements IWalletExDatabase {
  wallets!: Table<Wallet, number>;
  accounts!: Table<Account, number>;
  addresses!: Table<Address, number>;

  constructor() {
    super('wallet-ex-dexie-db');

    this.version(1).stores({
      wallets: '++id, name, password, interface, createdAt',
      accounts: '++id, name, coinType, deriveIdx, createdAt, walletId',
      addresses: '++id, address, deriveIdx, accountId, balance',
    });

    this.wallets.mapToClass(Wallet);
    this.accounts.mapToClass(Account);
    this.addresses.mapToClass(Address);
  }

  accountsForWallet(walletId: number): Promise<Account[]> {
    return this.accounts.where('walletId').equals(walletId).toArray();
  }

  findAccount(id: number): Promise<Account | undefined> {
    return this.accounts.get(id);
  }

  createAccount(obj: Account): Promise<number> {
    return this.accounts.add(obj);
  }

  listWallets(): Promise<Wallet[]> {
    return this.wallets.toArray();
  }

  createWallet(obj: Wallet): Promise<number> {
    return this.wallets.add(obj);
  }

  findWallet(id: number): Promise<Wallet | undefined> {
    return this.wallets.get(id);
  }
}

export const dxDb = new DexieDatabase();
