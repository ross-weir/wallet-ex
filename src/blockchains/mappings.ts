import { Bip44 } from '@/internal';

export const bip44Map: Record<string, Bip44> = {
  ergo: { coinType: 429, symbol: 'ERG', name: 'Ergo' },
};

export const iconMap: Record<string, Record<string, string>> = {
  ergo: {
    mainnet: '/icons/blockchains/ergo/ergo_black.svg',
    testnet: '/icons/blockchains/ergo/ergo_orange.svg',
  },
};
