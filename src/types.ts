import { Wallet } from '@/internal';

export enum OperatingMode {
  FullNode = 'fullNode',
  Simple = 'simple',
}

export type AddressBase58 = string;

export type Base16String = string;

export type EnvironmentVariables = Record<string, string>;

export interface WalletContext {
  wallet: Wallet;
  seed: Uint8Array;
}
