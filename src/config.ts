export interface AppConfig {
  network: string;
  operatingMode: string;
  powerUser: boolean;
  // Used for conversions
  fiatCurrency: string;
  // Used to discover used addresses and accounts on a fresh wallet restore:
  // https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#Account_discovery
  accountDiscoveryGap: number;
  addressDiscoveryGap: number;
}
