import { Service } from 'typedi';

import {
  Account,
  AddressService,
  db,
  Wallet,
  WalletExDatabase,
} from '@/internal';

import { CreateAccountDto } from './dto';
import { WalletContext } from '@/internal';

@Service()
export class AccountService {
  private readonly db: WalletExDatabase = db;

  constructor(private addressService: AddressService) {}

  public async create(
    { wallet, seed }: WalletContext,
    dto: CreateAccountDto,
  ): Promise<Account> {
    const account = Account.fromJson({
      ...dto,
      walletId: wallet.id,
    });

    const [accountId, addressStr] = await Promise.all([
      this.db.accounts.add(account),
      wallet.deriveAddress({
        seed,
        addressIdx: 0,
        accountIdx: account.deriveIdx,
      }),
    ]);

    account.id = accountId;

    await this.addressService.create({
      deriveIdx: 0,
      accountId,
      address: addressStr,
    });

    return account;
  }

  public async filterByWalletId(walletId: number): Promise<Account[]> {
    return this.db.accounts.where('walletId').equals(walletId).toArray();
  }
}
