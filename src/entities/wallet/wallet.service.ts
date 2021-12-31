import { inject, injectable } from 'tsyringe';
import { hashPassword } from '../../crypto';
import { getErgo } from '../../ergo';
import { BackendService } from '../../services/backend/backend';
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

    this.backend.storeSecretSeed({ password: dto.password, seed, wallet });

    // If we support other coins we probably will stop creating accounts when creating wallets
    await this.accountService.create(wallet, { name: 'Main', coinType: 429 });

    return wallet;
  }
}
