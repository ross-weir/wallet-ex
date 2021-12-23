import { Wallet } from '../../entities';

// Allow arbitrary args
// HD standards could evolve and require all sorts of params
export type HdArgs = Record<string, any>;

export interface HdStandard {
  deriviationPath(args: HdArgs): string;
}

export const getHdStandardForWallet = ({ hdStandard }: Wallet): HdStandard => {
  switch (hdStandard) {
    case 'eip3':
      return new Eip3HdStandard();
    default:
      throw new Error(`hdStandard not supported: ${hdStandard}`);
  }
};

export class Eip3HdStandard implements HdStandard {
  deriviationPath({ accountIdx, addressIdx }: HdArgs): string {
    // need to do strict undefined checks because the idx could be zero
    if (accountIdx === undefined || addressIdx === undefined) {
      throw new Error(`eip3HdStandard: accountIdx and addressIdx are required`);
    }

    return `m/44'/429'/${accountIdx}'/0/${addressIdx}`;
  }
}
