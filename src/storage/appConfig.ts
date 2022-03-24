import { SupportedBlockchain } from '@/blockchains';
import { ObjectStorage } from './objectStorage';
import { OperatingMode } from '@/types';

export interface AppConfig {
  network: string;
  operatingMode?: OperatingMode;
  powerUser?: boolean;
  // Used for conversions
  fiatTicker: string;
  blockchain?: SupportedBlockchain;
  useLocalNode: boolean;
  // Used to discover used addresses and accounts on a fresh wallet restore:
  // https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#Account_discovery
  accountDiscoveryGap: number;
  addressDiscoveryGap: number;
}

const getDefault = (): AppConfig => ({
  fiatTicker: 'USD',
  useLocalNode: false,
  accountDiscoveryGap: 20,
  addressDiscoveryGap: 20,
  network: 'mainnet',
});

const appConfig = new ObjectStorage('wallet-ex-config', getDefault());

export const getAppConfig = () => appConfig;
