import { Service } from 'typedi';

import {
  Account,
  AddressService,
  db,
  WalletContext,
  WalletExDatabase,
  SupportedBlockchain,
} from '@/internal';

import { CreateAccountDto } from './dto';

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

    const network = dto.network;

    const [accountId, addressStr] = await Promise.all([
      this.db.accounts.add(account),
      wallet.deriveAddress({
        seed,
        addressIdx: 0,
        accountIdx: account.deriveIdx,
        network,
      }),
    ]);

    account.id = accountId;

    await this.addressService.create(
      {
        deriveIdx: 0,
        accountId,
        address: addressStr,
      },
      account.getBlockchain(),
    );

    return account;
  }

  public async filterByWalletId(walletId: number): Promise<Account[]> {
    return this.db.accounts.where('walletId').equals(walletId).toArray();
  }

  /**
   * Given a list of accounts and a cointype + network, determine the
   * next derive index for the cointype + network combo.
   *
   * @param accounts List of existing accounts
   * @param blockchainName blockchain name we're deriving for
   * @param network Blockchain network we're deriving for (testnet vs mainnet, etc)
   * @returns The next index to use for deriviation
   */
  public getNextDeriveIndex(
    accounts: Account[],
    blockchainName: SupportedBlockchain,
    network: string,
  ): number {
    const hasExisting = accounts.find(
      (a) => a.blockchainName === blockchainName && a.network === network,
    );

    if (!hasExisting) {
      return 0;
    }

    // latest account matching coinType/network
    const latestAccount = accounts.reduce((prev, current) => {
      if (
        network === current.network &&
        blockchainName === current.blockchainName
      ) {
        return prev.deriveIdx > current.deriveIdx ? prev : current;
      }

      // different coin+network combo
      return prev;
    });

    return latestAccount.deriveIdx + 1;
  }
}
