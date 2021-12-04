import { invoke } from '@tauri-apps/api';
import { Wallet } from '../entities';
import {
  Backend,
  CreateWalletArgs,
  GetWalletArgs,
  BackendOpResult,
} from './backend';

export class TauriBackend implements Backend {
  createWallet(args: CreateWalletArgs): BackendOpResult<Wallet> {
    return invoke('create_wallet', { ...args });
  }

  getWallet(args: GetWalletArgs): BackendOpResult<Wallet> {
    return invoke('get_wallet', { ...args });
  }
}
