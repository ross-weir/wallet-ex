import { DeriveAddressArgs, WalletInterface } from './walletInterface';
import { Wallet } from '../../entities';
import { getHdStandardForWallet, HdStandard } from './hdStandard';
import { Ergo, getErgo } from '../../ergo';

/**
 * App-local wallet interface
 *
 * Uses local libraries to perform wallet operations in app as opposed to HW wallets that offload
 * operations to the hardware device
 */
export class LocalWalletInterface implements WalletInterface {
  private readonly ergo: Ergo;
  private readonly hdStandard: HdStandard;

  constructor(wallet: Wallet) {
    this.hdStandard = getHdStandardForWallet(wallet);
    this.ergo = getErgo();
  }

  async deriveAddress(args: DeriveAddressArgs): Promise<string> {
    if (!args.seedBytes) {
      throw new Error(
        'deriveAddress: Seed bytes are required for software wallets',
      );
    }

    const rootSk = this.ergo.ExtSecretKey.derive_master(args.seedBytes);
    const hdPathStr = this.hdStandard.deriviationPath(args.hdStandardArgs);
    const path = this.ergo.DerivationPath.from_string(hdPathStr);
    const addr = rootSk.derive(path);

    // TODO: base58 param is the network byte (mainnet vs testnet)
    return addr.public_key().to_address().to_base58(0);
  }

  signTx(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
