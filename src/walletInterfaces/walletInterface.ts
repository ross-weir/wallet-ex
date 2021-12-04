export type WalletInterfaceType = 'local' | 'ledger';

export interface WalletInterface {
  deriveAddress(): Promise<void>;
  signTx(): Promise<void>;
}
