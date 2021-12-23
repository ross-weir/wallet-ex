import { WalletInterfaceType } from '../walletInterfaces';

export interface Wallet {
  id: number;
  name: string;
  interface: WalletInterfaceType;
  hdStandard: 'eip3';
  createdAt: string;
}
