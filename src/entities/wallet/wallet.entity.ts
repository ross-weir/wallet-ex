import { plainToClass } from 'class-transformer';
import { getInterfaceForWallet } from '../../services';
import { toBase16 } from '../../utils/formatting';
import { BaseEntity } from '../baseEntity';

export class Wallet extends BaseEntity {
  name!: string;
  interface!: 'local' | 'ledger';
  hdStandard!: 'eip3';
  createdAt!: string;

  private seed?: Uint8Array;

  public hasSeed(): boolean {
    return !!this.seed;
  }

  public setSeed(seed: Uint8Array) {
    this.seed = seed;
  }

  public zeroSeed() {
    this.seed = new Uint8Array([]);
  }

  public async seedStorageKey(): Promise<string> {
    const key = new TextEncoder().encode(`${this.id}-${this.createdAt}`);
    const hashedKey = await crypto.subtle.digest('SHA-256', key);

    return toBase16(new Uint8Array(hashedKey));
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
