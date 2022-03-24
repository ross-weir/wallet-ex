import { Account, Wallet } from '@/entities';

/**
 * Database interface for the Wallet Ex application
 *
 * The database interface should be simple so it can
 * support both database frameworks with complex functionality
 * such as dexiejs but also support a tauri or mobile backed
 * database if required.
 *
 * It was important to me to support both approaches to
 * a backing database as there's a lot of information on
 * indexedDb being slow (see yoroi), I want to ensure
 * the database backend can be swapped if we
 * start running into performance issues.
 *
 * Originally this interface was implemented matching
 * the complex interface of dexie but that is extremely
 * hard to implement for tauri so I decided on the simple
 * design below.
 *
 * Could probably be refactored down the road to not
 * be monolithic.
 */
export interface IWalletExDatabase {
  listWallets(): Promise<Wallet[]>;
  createWallet(obj: Wallet): Promise<number>;
  findWallet(id: number): Promise<Wallet | undefined>;

  accountsForWallet(walletId: number): Promise<Account[]>;
  findAccount(id: number): Promise<Account | undefined>;
  createAccount(obj: Account): Promise<number>;
}
