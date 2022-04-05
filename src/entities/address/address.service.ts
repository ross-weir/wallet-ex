import { Service } from 'typedi';

import { Address, Blockchain, db, WalletExDatabase } from '@/internal';

import { CreateAddressDto } from './dto';

@Service()
export class AddressService {
  private readonly db: WalletExDatabase = db;

  public async create(
    dto: CreateAddressDto,
    blockchain?: Blockchain,
  ): Promise<Address> {
    let balance = 0;

    if (blockchain) {
      try {
        const response = await blockchain.client.accountBalance({
          accountIdentifier: { address: dto.address },
        });

        balance = Number(response.balances[0].value);
      } catch (e) {
        // No problem, will be fetched later by syncing module
        balance = 0;
      }
    }

    const address = Address.fromJson({ ...dto, balance });

    await this.db.addresses.add(address);

    return address;
  }

  public async filterByAccountId(accountId: number): Promise<Address[]> {
    return this.db.addresses.where('accountId').equals(accountId).toArray();
  }

  /**
   * Given the array of addresses find the latest address based on
   * the derive index. The "latest" address is the one with the
   * highest derive index.
   *
   * @param addresses find the latest address in the provided array
   * @returns
   */
  public getLatestAddressByDeriviation(addresses: Address[]): Address {
    return addresses.reduce((prev, current) =>
      prev.deriveIdx > current.deriveIdx ? prev : current,
    );
  }
}
