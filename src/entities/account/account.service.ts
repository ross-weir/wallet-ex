import { inject, injectable } from 'tsyringe';
import { BackendService } from '../../services/backend/backend';
import { AddressService } from '../address';
import { Wallet } from '../wallet';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto';

@injectable()
export class AccountService {
  constructor(
    @inject('BackendService') private backend: BackendService,
    @inject(AddressService) private addressService: AddressService,
  ) {}

  public async create(wallet: Wallet, dto: CreateAccountDto): Promise<Account> {
    const account = await this.backend.createAccount({
      ...dto,
      walletId: wallet.id,
    });
    const addressStr = await wallet.deriveAddress({
      addressIdx: 0,
      accountIdx: account.deriveIdx,
    });
    this.addressService.create({
      deriveIdx: 0,
      accountId: account.id,
      address: addressStr,
    });

    return Account.fromJson(account);
  }
}
