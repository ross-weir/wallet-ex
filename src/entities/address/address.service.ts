import { Inject, Service } from 'typedi';

import type { BlockchainClient } from '@/blockchains';
import { Address, db, WalletExDatabase } from '@/internal';
import { BlockchainClientToken } from '@/ioc';

import { CreateAddressDto } from './dto';

@Service()
export class AddressService {
  private readonly db: WalletExDatabase = db;

  constructor(@Inject(BlockchainClientToken) private chain: BlockchainClient) {}

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
