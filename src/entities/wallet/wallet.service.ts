import { deserializeArray, plainToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { hashPassword } from '../../crypto';
import { getErgo } from '../../ergo';
import { BackendService } from '../../services/backend';
import { AccountService } from '../account';
import { CreateWalletDto } from './dto';
import { Wallet } from './wallet.entity';

@injectable()
export class WalletService {
  private readonly ergo = getErgo();

  constructor(
    @inject('BackendService') private backend: BackendService,
    @inject(AccountService) private accountService: AccountService,
  ) {}

  public async create(dto: CreateWalletDto): Promise<Wallet> {
    const password = await hashPassword(dto.password);
    const walletJson = await this.backend.createWallet({
      name: dto.name,
      password,
      interface: 'local',
      hdStandard: 'eip3',
    });
    const wallet = Wallet.fromJson(walletJson);
    const seed = this.ergo.Mnemonic.to_seed(dto.mnemonic, dto.mnemonicPass);
    wallet.setSeed(seed);

    const storageKey = await wallet.seedStorageKey();
    this.backend.storeSecretSeed({ password: dto.password, seed, storageKey });

    // If we support other coins we probably will stop creating accounts when creating wallets
    await this.accountService.create(wallet, { name: 'Main', coinType: 429 });

    return wallet;
  }

  public async list(): Promise<Wallet[]> {
    const wallets = await this.backend.listWallets();

    return wallets.map((w) => plainToClass(Wallet, w));
  }
}
