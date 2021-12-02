import { invoke } from '@tauri-apps/api';
import { Wallet } from '../entities';
import {
  Backend,
  CreateWalletArgs,
  GetWalletArgs,
  WalletOpResult,
} from './backend';

export class TauriBackend implements Backend {
  createWallet(args: CreateWalletArgs): WalletOpResult<Wallet> {
    return invoke('create_wallet', { ...args });
  }

  getWallet(args: GetWalletArgs): WalletOpResult<Wallet> {
    return invoke('get_wallet', { ...args });
  }
}
