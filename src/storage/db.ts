import Dexie, { Table } from 'dexie';

import { Account, Address, Wallet } from '@/internal';

export class WalletExDatabase extends Dexie {
  wallets!: Table<Wallet, number>;
  accounts!: Table<Account, number>;
  addresses!: Table<Address, number>;

  constructor() {
    super('wallet-ex-dexie-db');

    this.version(1).stores({
      wallets: '++id, name, password, interface',
      accounts: '++id, name, coinType, deriveIdx, walletId',
      addresses: '++id, address, deriveIdx, accountId, balance',
    });

    this.wallets.mapToClass(Wallet);
    this.accounts.mapToClass(Account);
    this.addresses.mapToClass(Address);
  }
}

export const db = new WalletExDatabase();
