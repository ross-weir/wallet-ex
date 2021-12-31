import { plainToClass } from 'class-transformer';
import { BaseEntity } from '../baseEntity';

export class Account extends BaseEntity {
  name!: string;
  deriveIdx!: number;
  coinType!: number;
  walletId!: number;

  public static fromJson(obj: object): Account {
    return plainToClass(Account, obj);
  }
}
