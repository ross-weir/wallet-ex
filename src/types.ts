import { Wallet } from '@/internal';

export enum OperatingMode {
  LocalInfrastructure = 'localInfrastructure',
  Simple = 'simple',
}

export type AddressBase58 = string;

export type Base16String = string;

export type EnvironmentVariables = Record<string, string>;

export interface WalletContext {
  wallet: Wallet;
  seed: Uint8Array;
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
