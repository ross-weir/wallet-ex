import { Bip44, SupportedBlockchain } from '@/internal';

export const bip44Map: Record<SupportedBlockchain, Bip44> = {
  [SupportedBlockchain.Ergo]: { coinType: 429, symbol: 'ERG', name: 'Ergo' },
};

export const iconMap: Record<SupportedBlockchain, Record<string, string>> = {
  [SupportedBlockchain.Ergo]: {
    mainnet: '/icons/blockchains/ergo/ergo_black.svg',
    testnet: '/icons/blockchains/ergo/ergo_orange.svg',
  },
};
