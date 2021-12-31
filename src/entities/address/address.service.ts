import { inject, injectable } from 'tsyringe';
import { CreateAddressDto } from './dto';
import { BackendService } from '../../services/backend/backend';
import { Address } from './address.entity';

@injectable()
export class AddressService {
  constructor(@inject('BackendService') private backend: BackendService) {}

  public async create(dto: CreateAddressDto): Promise<Address> {
    const address = await this.backend.createAddress({ ...dto });
    // TODO: scan for balances

    return Address.fromJson(address);
  }
}
