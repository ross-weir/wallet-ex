import { AddressBase58 } from '../types';
import { Address as ErgoAddress } from 'ergo-lib-wasm-browser';

export type WalletInterfaceType = 'local' | 'ledger';

export interface DeriveAddressArgs {
  // Not required for hardware wallets
  seedBytes?: Uint8Array;
  derivationPath: string;
}

// HW wallets would accept path
// return address string

// Local wallets accept sk + path
// return derived sk - or do they? maybe they actually do just return an address string
// client code should be responsible for persisting address entity etc
// theres no need to handle any derived sks or pks?

// TODO: handle fail paths
// methods should return promises to keep compatible with HW devices
export interface WalletInterface {
  /**
   * Derive a new wallet address from the provided path & arguemnts.
   * This is just the initial path generated from a public key, in order to be
   * used to receive funds it must be converted to a NetworkAddress by
   * having the magic network byte added.
   *
   * @param args derive address arguments
   */
  deriveAddress(args: DeriveAddressArgs): Promise<ErgoAddress>;

  signTx(): Promise<void>;
}
