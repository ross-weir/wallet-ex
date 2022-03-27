import { OperatingMode } from '@/types';

import { ObjectStorage } from './objectStorage';

export interface AppConfig {
  operatingMode?: OperatingMode;
  powerUser?: boolean;
  // Used for conversions
  fiatTicker: string;
  // Used to discover used addresses and accounts on a fresh wallet restore:
  // https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#Account_discovery
  accountDiscoveryGap: number;
  addressDiscoveryGap: number;
}

const getDefault = (): AppConfig => ({
  fiatTicker: 'USD',
  accountDiscoveryGap: 20,
  addressDiscoveryGap: 20,
});

const appConfig = new ObjectStorage('wallet-ex-config', getDefault());

export const getAppConfig = () => appConfig;
