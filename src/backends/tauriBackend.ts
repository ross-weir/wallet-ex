import { invoke } from '@tauri-apps/api';
import { Wallet } from '../entities';
import {
  Backend,
  CreateWalletArgs,
  GetWalletArgs,
  BackendOpResult,
  GetSecretKeyArgs,
  StoreSecretKeyArgs,
} from './backend';

export class TauriBackend implements Backend {
  createWallet(args: CreateWalletArgs): BackendOpResult<Wallet> {
    return invoke('create_wallet', { ...args });
  }

  getWallet(args: GetWalletArgs): BackendOpResult<Wallet> {
    return invoke('get_wallet', { ...args });
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
