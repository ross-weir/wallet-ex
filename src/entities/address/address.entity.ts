import { plainToClass } from 'class-transformer';
import { BaseEntity } from '../baseEntity';

export class Address extends BaseEntity {
  address!: string;
  deriveIdx!: number;
  accountId!: number;
  balance!: number;

  public static fromJson(obj: object): Address {
    return plainToClass(Address, obj);
  }
}
