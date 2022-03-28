import { plainToInstance } from 'class-transformer';

import {
  BaseEntity,
  Blockchain,
  getBlockchain,
  SupportedBlockchain,
} from '@/internal';

export interface IAccount {
  id?: number;
  name: string;
  deriveIdx: number;
  blockchainName: SupportedBlockchain;
  network: string;
  walletId: number;
}

export class Account extends BaseEntity implements IAccount {
  name!: string;
  deriveIdx!: number;
  blockchainName!: SupportedBlockchain;
  network!: string;
  walletId!: number;

  public getBlockchain(): Blockchain | undefined {
    return getBlockchain(this.blockchainName, this.network);
  }

  public static fromJson(obj: IAccount): Account {
    return plainToInstance(Account, obj);
  }
}
