import { WalletInterfaceType } from '../walletInterfaces';

export class Wallet {
  private walletInterfaceType: WalletInterfaceType;

  constructor(walletInterfaceType: WalletInterfaceType) {
    this.walletInterfaceType = walletInterfaceType;
  }
}
