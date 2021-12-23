import { DeriveAddressArgs, WalletInterface } from './walletInterface';
import {
  DerivationPath,
  ExtSecretKey,
  Address as ErgoAddress,
} from 'ergo-lib-wasm-browser';
import { Wallet } from '../entities';
import { getHdStandardForWallet, HdStandard } from './hdStandard';

/**
 * App-local wallet interface
 *
 * Uses local libraries to perform wallet operations in app as opposed to HW wallets that offload
 * operations to the hardware device
 */
export class LocalWalletInterface implements WalletInterface {
  private readonly hdStandard: HdStandard;

  constructor(wallet: Wallet) {
    this.hdStandard = getHdStandardForWallet(wallet);
  }

  async deriveAddress(args: DeriveAddressArgs): Promise<ErgoAddress> {
    if (!args.seedBytes) {
      throw new Error(
        'deriveAddress: Seed bytes are required for software wallets',
      );
    }

    const rootSk = ExtSecretKey.derive_master(args.seedBytes);
    const hdPathStr = this.hdStandard.deriviationPath(args.hdStandardArgs);
    const path = DerivationPath.from_string(hdPathStr);
    const addr = rootSk.derive(path);

    return addr.public_key().to_address();
  }

  signTx(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
