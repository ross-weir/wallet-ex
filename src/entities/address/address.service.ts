import { Inject, Service } from 'typedi';

import type { BlockchainClient } from '../../blockchains';
import { BackendServiceToken, BlockchainClientToken } from '../../ioc';
import { BackendService } from '../../services';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto';

@Service()
export class AddressService {
  constructor(
    @Inject(BackendServiceToken) private backend: BackendService,
    @Inject(BlockchainClientToken) private chain: BlockchainClient,
  ) {}

  public async create(dto: CreateAddressDto): Promise<Address> {
    const balanceResponse = await this.chain.accountBalance({
      accountIdentifier: { address: dto.address },
    });
    const balance = Number(balanceResponse.balances[0].value);

    return this.backend
      .createAddress({ ...dto, balance })
      .then(Address.fromJson);
  }

  public async filterByAccountId(accountId: number): Promise<Address[]> {
    return this.backend
      .addressesForAccount(accountId)
      .then((addresses) => addresses.map(Address.fromJson));
  }
}
