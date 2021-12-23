import { HdArgs } from './hdStandard';

export type WalletInterfaceType = 'local' | 'ledger';

export interface DeriveAddressArgs {
  // Not required for hardware wallets
  seedBytes?: Uint8Array;
  // Object of key/values relevant to the particular hd standard set for the wallet
  hdStandardArgs: HdArgs;
}

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
  deriveAddress(args: DeriveAddressArgs): Promise<string>;

  signTx(): Promise<void>;
}
