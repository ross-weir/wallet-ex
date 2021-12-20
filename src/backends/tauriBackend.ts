import { invoke } from '@tauri-apps/api';
import { Account, Address, Wallet } from '../entities';
import {
  Backend,
  CreateWalletArgs,
  BackendOpResult,
  GetSecretSeedArgs,
  StoreSecretSeedArgs,
  CreateAccountArgs,
} from './backend';

export class TauriBackend implements Backend {
  addressesForAccount(accountId: number): BackendOpResult<Address[]> {
    return invoke('addresses_for_account', { accountId });
  }

  createAccount(args: CreateAccountArgs): BackendOpResult<Account> {
    return invoke('create_account', { args });
  }

  findAccount(id: number): BackendOpResult<Account> {
    return invoke('find_account', { id });
  }

  listWallets(): BackendOpResult<Wallet[]> {
    return invoke('list_wallets');
  }

  createWallet(args: CreateWalletArgs): BackendOpResult<Wallet> {
    return invoke('create_wallet', { args });
  }

  findWallet(id: number): BackendOpResult<Wallet> {
    return invoke('find_wallet', { id });
  }

  // Do this here, tauri has a fs module
  storeSecretSeed(args: StoreSecretSeedArgs): BackendOpResult<void> {
    throw new Error('Method not implemented.');
  }

  // Do this here, tauri has a fs module
  getSecretSeed(args: GetSecretSeedArgs): BackendOpResult<string> {
    throw new Error('Method not implemented.');
  }
}
