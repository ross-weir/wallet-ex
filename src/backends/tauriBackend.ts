import { invoke } from '@tauri-apps/api';
import { Account, Wallet } from '../entities';
import {
  Backend,
  CreateWalletArgs,
  BackendOpResult,
  GetSecretKeyArgs,
  StoreSecretKeyArgs,
  CreateAccountArgs,
} from './backend';

export class TauriBackend implements Backend {
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
  storeSecretKey(args: StoreSecretKeyArgs): BackendOpResult<void> {
    throw new Error('Method not implemented.');
  }

  // Do this here, tauri has a fs module
  getSecretKey(args: GetSecretKeyArgs): BackendOpResult<string> {
    throw new Error('Method not implemented.');
  }
}
