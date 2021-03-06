import { plainToClass } from 'class-transformer';

import { checkPassword } from '@/crypto';
import { BaseEntity } from '@/internal';
import { getInterfaceForWallet } from '@/services';
import { toBase16 } from '@/utils/fmt';

export interface IWallet {
  id?: number;
  name: string;
  password: string;
  interface: 'software' | 'ledger';
}

export class Wallet extends BaseEntity implements IWallet {
  name!: string;
  password!: string;
  interface!: 'software' | 'ledger';

  public static fromJson(obj: IWallet): Wallet {
    return plainToClass(Wallet, obj);
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

  public async checkCredentials(plainTextPassword: string): Promise<boolean> {
    return checkPassword(plainTextPassword, this.password);
  }

  public async deriveAddress(
    hdStandardArgs: Record<string, any>,
  ): Promise<string> {
    const seed = hdStandardArgs.seed;

    if (!seed) {
      throw new Error('Wallet.deriveAddress: seed not set for wallet');
    }

    const walletInterface = getInterfaceForWallet(this);

    return walletInterface.deriveAddress({
      seedBytes: seed,
      hdStandardArgs,
    });
  }

  private async seedStorageKey(): Promise<string> {
    const key = new TextEncoder().encode(`${this.id}-${this.name}`);
    const hashedKey = await crypto.subtle.digest('SHA-256', key);

    return toBase16(new Uint8Array(hashedKey));
  }
}
