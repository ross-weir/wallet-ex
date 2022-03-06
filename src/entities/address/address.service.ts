import { CreateAddressDto } from './dto';
import { Address } from './address.entity';
import { Inject, Service } from 'typedi';
import { BackendServiceToken, BlockchainClientToken } from '../../ioc';
import { BlockchainClient, BackendService } from '../../services';

@Service()
export class AddressService {
  constructor(
    @Inject(BackendServiceToken) private backend: BackendService,
    @Inject(BlockchainClientToken) private chain: BlockchainClient,
  ) {}

  public async create(dto: CreateAddressDto): Promise<Address> {
    return this.chain
      .balanceForAddress(dto.address)
      .then((balance) => this.backend.createAddress({ ...dto, balance }))
      .then(Address.fromJson);
  }

  public async filterByAccountId(accountId: number): Promise<Address[]> {
    return this.backend
      .addressesForAccount(accountId)
      .then((addresses) => addresses.map(Address.fromJson));
  }
}
