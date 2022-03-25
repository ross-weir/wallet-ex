import { Inject, Service } from 'typedi';

import type { BlockchainClient } from '@/blockchains';
import { BlockchainClientToken } from '@/ioc';

import { Address } from './address.entity';
import { CreateAddressDto } from './dto';
import { db, WalletExDatabase } from '@/storage';

@Service()
export class AddressService {
  private readonly db: WalletExDatabase;

  constructor(@Inject(BlockchainClientToken) private chain: BlockchainClient) {
    this.db = db;
  }

  public async create(dto: CreateAddressDto): Promise<Address> {
    const balanceResponse = await this.chain.accountBalance({
      accountIdentifier: { address: dto.address },
    });
    const balance = Number(balanceResponse.balances[0].value);
    const address = Address.fromJson({ ...dto, balance });

    await this.db.addresses.add(address);

    return address;
  }

  public async filterByAccountId(accountId: number): Promise<Address[]> {
    return this.db.addresses.where('accountId').equals(accountId).toArray();
  }
}
