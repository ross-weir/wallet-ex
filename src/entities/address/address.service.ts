import { CreateAddressDto } from './dto';
import { Address } from './address.entity';
import { Inject, Service } from 'typedi';
import { BackendServiceToken, ChainProviderToken } from '../../ioc';
import { ChainProvider, BackendService } from '../../services';

@Service()
export class AddressService {
  constructor(
    @Inject(BackendServiceToken) private backend: BackendService,
    @Inject(ChainProviderToken) private chain: ChainProvider,
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
