import { Inject, Service } from 'typedi';

import { BackendServiceToken } from '../../ioc';
import { BackendService } from '../../services/backend/backend';
import { AddressService } from '../address';
import { Wallet } from '../wallet';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto';

@Service()
export class AccountService {
  constructor(
    @Inject(BackendServiceToken) private backend: BackendService,
    private addressService: AddressService,
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

  public async filterByWalletId(walletId: number): Promise<Account[]> {
    return this.backend
      .accountsForWallet(walletId)
      .then((accts) => accts.map(Account.fromJson));
  }
}
