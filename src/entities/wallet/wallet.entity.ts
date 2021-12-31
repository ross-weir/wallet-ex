import { plainToClass } from 'class-transformer';
import { getInterfaceForWallet } from '../../services';
import { BaseEntity } from '../baseEntity';

export class Wallet extends BaseEntity {
  name!: string;
  interface!: 'local' | 'ledger';
  hdStandard!: 'eip3';
  createdAt!: string;

  private seed?: Uint8Array;

  public setSeed(seed: Uint8Array) {
    this.seed = seed;
  }

  public async deriveAddress(hdStandardArgs: object): Promise<string> {
    if (!this.seed) {
      throw new Error('Wallet.deriveAddress: seed not set for wallet');
    }

    const walletInterface = getInterfaceForWallet(this);

    return walletInterface.deriveAddress({
      seedBytes: this.seed,
      hdStandardArgs,
    });
  }

  public static fromJson(obj: object): Wallet {
    return plainToClass(Wallet, obj);
  }
}
