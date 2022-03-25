import { Service } from 'typedi';

import { AddressService, Wallet } from '@/entities';

import { Account } from './account.entity';
import { CreateAccountDto } from './dto';
import { db, WalletExDatabase } from '@/storage';

@Service()
export class AccountService {
  private readonly db: WalletExDatabase;

  constructor(private addressService: AddressService) {
    this.db = db;
  }

  public async create(wallet: Wallet, dto: CreateAccountDto): Promise<Account> {
    const account = Account.fromJson({
      ...dto,
      walletId: wallet.id,
    });

    const [accountId, addressStr] = await Promise.all([
      this.db.accounts.add(account),
      wallet.deriveAddress({
        addressIdx: 0,
        accountIdx: account.deriveIdx,
      }),
    ]);

    await this.addressService.create({
      deriveIdx: 0,
      accountId,
      address: addressStr,
    });

    return Account.fromJson(account);
  }

  public async filterByWalletId(walletId: number): Promise<Account[]> {
    return this.db.accounts.where('walletId').equals(walletId).toArray();
  }
}
