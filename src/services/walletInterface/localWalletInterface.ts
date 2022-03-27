import { Ergo, getErgo } from '@/ergo';

import { getHdStandardForWallet, HdStandard } from './hdStandard';
import { DeriveAddressArgs, WalletInterface } from './walletInterface';

/**
 * App-local wallet interface
 *
 * Uses local libraries to perform wallet operations in app as opposed to HW wallets that offload
 * operations to the hardware device
 */
export class LocalWalletInterface implements WalletInterface {
  private readonly ergo: Ergo;
  private readonly hdStandard: HdStandard;

  constructor() {
    this.hdStandard = getHdStandardForWallet();
    this.ergo = getErgo();
  }

  async deriveAddress(args: DeriveAddressArgs): Promise<string> {
    if (!args.seedBytes) {
      throw new Error(
        'deriveAddress: Seed bytes are required for software wallets',
      );
    }

    const network = args.hdStandardArgs.network;

    if (!network) {
      throw new Error('Failed to retrieve network');
    }

    const networkPrefix =
      network === 'mainnet'
        ? this.ergo.NetworkPrefix.Mainnet
        : this.ergo.NetworkPrefix.Testnet;

    const rootSk = this.ergo.ExtSecretKey.derive_master(args.seedBytes);
    const hdPathStr = this.hdStandard.deriviationPath(args.hdStandardArgs);
    const path = this.ergo.DerivationPath.from_string(hdPathStr);
    const addr = rootSk.derive(path);

    return addr.public_key().to_address().to_base58(networkPrefix);
  }

  signTx(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
