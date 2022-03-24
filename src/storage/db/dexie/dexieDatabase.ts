import Dexie, { Table } from 'dexie';

import { Account, Address, IWallet, Wallet } from '@/entities';
import { IWalletExDatabase } from '@/storage/db';

export class DexieDatabase extends Dexie implements IWalletExDatabase {
  wallets!: Table<IWallet, number>;
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
}

export const dxDb = new DexieDatabase();
