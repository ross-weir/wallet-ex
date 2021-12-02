import { WalletBackendType } from '../types';

export class Wallet {
  private backend: WalletBackendType;

  constructor(backend: WalletBackendType) {
    this.backend = backend;
  }
}
