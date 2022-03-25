import { Wallet } from '@/entities';

import { LocalWalletInterface } from './localWalletInterface';
import { WalletInterface } from './walletInterface';

export const getInterfaceForWallet = (wallet: Wallet): WalletInterface => {
  switch (wallet.interface) {
    case 'local':
      return new LocalWalletInterface();
    case 'ledger':
      throw new Error('WalletInterface: Ledger not supported yet');
  }
};
