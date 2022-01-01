import { CreateAddressDto } from './dto';
import { BackendService } from '../../services/backend/backend';
import { Address } from './address.entity';
import { Inject, Service } from 'typedi';
import { BackendServiceToken } from '../../ioc';

@Service()
export class AddressService {
  constructor(@Inject(BackendServiceToken) private backend: BackendService) {}

  public async create(dto: CreateAddressDto): Promise<Address> {
    const address = await this.backend.createAddress({ ...dto });
    // TODO: scan for balances

    return Address.fromJson(address);
  }

  public async filterByAccountId(accountId: number): Promise<Address[]> {
    return this.backend
      .addressesForAccount(accountId)
      .then((addresses) => addresses.map(Address.fromJson));
  }
}
