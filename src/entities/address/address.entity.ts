import { plainToClass } from 'class-transformer';

import { BaseEntity } from '../baseEntity';

export interface IAddress {
  id?: number;
  address: string;
  deriveIdx: number;
  accountId: number;
  balance: number;
}

export class Address extends BaseEntity implements IAddress {
  address!: string;
  deriveIdx!: number;
  accountId!: number;
  balance!: number;

  public static fromJson(obj: IAddress): Address {
    return plainToClass(Address, obj);
  }
}
