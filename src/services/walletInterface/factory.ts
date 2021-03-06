import { Wallet } from '@/internal';

import { LocalWalletInterface } from './localWalletInterface';
import { WalletInterface } from './walletInterface';

export const getInterfaceForWallet = (wallet: Wallet): WalletInterface => {
  switch (wallet.interface) {
    case 'software':
      return new LocalWalletInterface();
    case 'ledger':
      throw new Error('WalletInterface: Ledger not supported yet');
  }
};
