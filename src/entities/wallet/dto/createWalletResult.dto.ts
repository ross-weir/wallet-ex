import { Wallet } from '@/internal';

export interface CreateWalletResultDto {
  wallet: Wallet;
  seed: Uint8Array;
}
