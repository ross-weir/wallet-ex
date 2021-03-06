import { Service } from 'typedi';

import { hashPassword } from '@/crypto';
import { getErgo } from '@/ergo';
import { AccountService, db, Wallet, WalletExDatabase } from '@/internal';

import { CreateWalletDto, CreateWalletResultDto } from './dto';

@Service()
export class WalletService {
  private readonly db: WalletExDatabase = db;
  private readonly ergo = getErgo();

  constructor(private accountService: AccountService) {}

  public async create(dto: CreateWalletDto): Promise<CreateWalletResultDto> {
    const password = await hashPassword(dto.password);
    const wallet = Wallet.fromJson({
      name: dto.name,
      password,
      interface: 'software',
    });
    const seed = this.ergo.Mnemonic.to_seed(dto.mnemonic, dto.mnemonicPass);

    const walletId = await db.wallets.add(wallet);
    // Id is used when storing the secret seed to get a unique storage key
    wallet.id = walletId;

    wallet.storeSeed(dto.password, seed);

    return { wallet, seed };
  }

  public async findOne(id: number): Promise<Wallet | undefined> {
    return this.db.wallets.get(id);
  }

  public async list(): Promise<Wallet[]> {
    return this.db.wallets.toArray();
  }
}
