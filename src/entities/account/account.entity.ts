import { plainToInstance } from 'class-transformer';

import { BaseEntity, Blockchain, getBlockchain } from '@/internal';

export interface IAccount {
  id?: number;
  name: string;
  deriveIdx: number;
  coinType: number;
  network: string;
  walletId: number;
}

export class Account extends BaseEntity implements IAccount {
  name!: string;
  deriveIdx!: number;
  coinType!: number;
  network!: string;
  walletId!: number;

  public blockchain(): Blockchain | undefined {
    return getBlockchain(this.coinType, this.network);
  }

  public static fromJson(obj: IAccount): Account {
    return plainToInstance(Account, obj);
  }
}
