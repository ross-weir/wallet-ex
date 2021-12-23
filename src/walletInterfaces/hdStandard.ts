import { Wallet } from '../entities';

export type HdArgs = Record<string, any>;

export interface HdStandard {
  deriviationPath(args: HdArgs): string;
}

export const getHdStandardForWallet = ({ hdStandard }: Wallet) => {
  switch (hdStandard) {
    case 'eip3':
      return new Eip3HdStandard();
    default:
      throw new Error(`hdStandard not supported: ${hdStandard}`);
  }
};

export class Eip3HdStandard implements HdStandard {
  deriviationPath({ accountIdx, addressIdx }: HdArgs): string {
    if (!accountIdx || !addressIdx) {
      throw new Error(`eip3HdStandard: accountIdx and addressIdx are required`);
    }

    return `m/44'/429'/${accountIdx}'/0/${addressIdx}`;
  }
}
