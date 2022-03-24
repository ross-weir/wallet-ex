import { plainToClass } from 'class-transformer';

import { getInterfaceForWallet } from '../../services';
import { toBase16 } from '../../utils/fmt';
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

  public async retrieveSeed(password: string): Promise<Uint8Array> {
    return await this.seedStorageKey().then((storageKey) =>
      this.backend.getSecretSeed({ password, storageKey }),
    );
  }

  public async storeSeed(password: string, seed: Uint8Array): Promise<void> {
    return await this.seedStorageKey().then((storageKey) =>
      this.backend.storeSecretSeed({ password, seed, storageKey }),
    );
  }

  public async checkCredentials(args: Record<string, any>): Promise<boolean> {
    return this.backend.checkCredentialsForWallet(this.id, args);
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

  private async seedStorageKey(): Promise<string> {
    const key = new TextEncoder().encode(`${this.id}-${this.createdAt}`);
    const hashedKey = await crypto.subtle.digest('SHA-256', key);

    return toBase16(new Uint8Array(hashedKey));
  }
}
