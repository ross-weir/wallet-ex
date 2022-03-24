import { plainToInstance } from 'class-transformer';

import { BaseEntity } from '../baseEntity';

export interface IAccount {
  id?: number;
  name: string;
  deriveIdx: number;
  coinType: number;
  walletId: number;
}

export class Account extends BaseEntity implements IAccount {
  name!: string;
  deriveIdx!: number;
  coinType!: number;
  walletId!: number;

  public static fromJson(obj: object): Account {
    return plainToInstance(Account, obj);
  }
}
