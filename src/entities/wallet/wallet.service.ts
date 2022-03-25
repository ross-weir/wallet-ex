import { Service } from 'typedi';

import { hashPassword } from '@/crypto';
import { AccountService } from '@/entities';
import { getErgo } from '@/ergo';

import { CreateWalletDto } from './dto';
import { Wallet } from './wallet.entity';
import { db, WalletExDatabase } from '@/storage';

@Service()
export class WalletService {
  private readonly db: WalletExDatabase;
  private readonly ergo = getErgo();

  constructor(private accountService: AccountService) {
    this.db = db;
  }

  public async create(dto: CreateWalletDto): Promise<Wallet> {
    const password = await hashPassword(dto.password);
    const wallet = Wallet.fromJson({
      name: dto.name,
      password,
      interface: 'local',
    });
    const seed = this.ergo.Mnemonic.to_seed(dto.mnemonic, dto.mnemonicPass);

    wallet.seed = seed;

    await Promise.all([
      this.db.wallets.add(wallet),
      wallet.storeSeed(dto.password, seed),
      // If we support other coins we probably will stop creating accounts when creating wallets
      this.accountService.create(wallet, {
        deriveIdx: 1, // dxie
        name: 'Main',
        coinType: 429,
      }),
    ]);

    return wallet;
  }

  public async findOne(id: number): Promise<Wallet | undefined> {
    return this.db.wallets.get(id);
  }

  public async list(): Promise<Wallet[]> {
    const wallets = await this.db.wallets.toArray();
    console.log(wallets);
    return wallets;
  }
}
