export type WalletInterfaceType = 'local' | 'ledger';

export interface WalletInterface {
  deriveAddress(): Promise<void>;
  sign(): Promise<void>;
}
