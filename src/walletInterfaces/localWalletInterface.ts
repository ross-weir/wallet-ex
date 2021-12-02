import { invoke } from '@tauri-apps/api/tauri';
import { WalletInterface } from './walletInterface';

export class localWalletInterface implements WalletInterface {
  async deriveAddress(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async sign(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
