export interface Wallet {
  id: number;
  name: string;
  interface: 'local' | 'ledger';
  hdStandard: 'eip3';
  createdAt: string;
}
