import { ChainProvider } from './chainProvider';
import { ExplorerChainProvider } from './explorerChainProvider';

export type { ChainProvider } from './chainProvider';

// TODO: return chain provider based on
//  - Operating mode
//  - Network (mainnet vs testnet)
export const getChainProvider = (): ChainProvider =>
  // 0 = mainnet
  new ExplorerChainProvider(0);
