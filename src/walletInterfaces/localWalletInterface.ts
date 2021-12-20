import { DeriveAddressArgs, WalletInterface } from './walletInterface';
import {
  DerivationPath,
  ExtSecretKey,
  Address as ErgoAddress,
} from 'ergo-lib-wasm-browser';

/**
 * App-local wallet interface
 *
 * Uses local libraries to perform wallet operations in app as opposed to HW wallets that offload
 * operations to the hardware device
 */
export class localWalletInterface implements WalletInterface {
  async deriveAddress(args: DeriveAddressArgs): Promise<ErgoAddress> {
    // Maybe use mnemonic instead? Makes it easier to store rather than bytes?
    // Mnemonic.to_seed(args.mnemonic, passphrase)
    // But then we need to store passphrase as well, probably storing seed bytes is the way
    // Need to figure out a good cross-platform way to store bytes in file
    if (!args.seedBytes) {
      throw new Error('Seed bytes are required for software wallets');
    }

    const rootSk = ExtSecretKey.derive_master(args.seedBytes);
    // const path = DerivationPath.from_string(args.derivationPath);
    // have a way to create path from string
    const path = DerivationPath.new(0, new Uint32Array([0]));
    const addr = rootSk.derive(path);

    return addr.public_key().to_address();
  }

  signTx(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
