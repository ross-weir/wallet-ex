import path from 'path';
import Container from 'typedi';

import {
  bip44Map,
  Blockchain,
  BlockchainFactoryConfig,
  iconMap,
  SupportedBlockchain,
} from '@/internal';
import { BackendServiceToken } from '@/ioc';

import { ergoBlockchainFactory } from './ergo';

type BlockchainFactoryFn = (
  cfg: BlockchainFactoryConfig,
) => Promise<Blockchain>;

const factoryMap: Record<SupportedBlockchain, BlockchainFactoryFn> = {
  [SupportedBlockchain.Ergo]: ergoBlockchainFactory,
};

/**
 * @returns Array of supported blockchains/coins
 */
export const getSupportedBlockchains = (): string[] =>
  Object.values(SupportedBlockchain);

/**
 * Get the supported networks for the supplied blockchain.
 *
 * For example ['mainnet', 'testnet', ...]
 *
 * @param blockchain Name of the blockchain to get supported networks for.
 * @returns Array of supported networks.
 */
export const getNetworksForBlockchain = (
  blockchain: SupportedBlockchain,
): string[] =>
  ({
    [SupportedBlockchain.Ergo]: ['mainnet', 'testnet'],
  }[blockchain]);

/**
 * Get a name from the supplied coin type.
 *
 * List of coins: https://github.com/satoshilabs/slips/blob/master/slip-0044.md
 *
 * @param coinType SLIP-0044 cointype
 * @returns Name of the blockchain belonging to the coinType
 */
export const coinTypeToBlockchain = (coinType: number): string => {
  for (const [chain, coin] of Object.entries(bip44Map)) {
    if (coinType === coin.coinType) {
      return chain;
    }
  }

  return '';
};

/**
 * Get an icon path based on the blockchain & network.
 *
 * The path is relative to the root of the 'public' directory.
 *
 * @param blockchain Name of the blockchain
 * @param network Network of the icon
 * @returns Path to an icon in the public directory
 */
export const getIconForBlockchain = (
  blockchain: string,
  network: string,
): string => iconMap[blockchain][network];

type NetworkToBlockchainMap = Record<string, Blockchain>;
const blockchainCache: Partial<
  Record<SupportedBlockchain, NetworkToBlockchainMap>
> = {};

/**
 * Get an instance of `Blockchain` for the supplied blockchainId.
 *
 * @param blockchainId Name | coinType of the blockchain
 * @param network Network of the blockchain
 * @returns An instance of `Blockchain` if it has been created
 * otherwise `undefined`.
 */
export const getBlockchain = (
  blockchainId: string | number,
  network: string,
): Blockchain | undefined => {
  if (typeof blockchainId === 'number') {
    blockchainId = coinTypeToBlockchain(blockchainId);
  }

  const bc = blockchainId as SupportedBlockchain;

  if (!blockchainCache[bc]) {
    return;
  }

  return blockchainCache[bc]![network];
};

/**
 * Create a new `Blockchain` instance based on the supplied
 * parameters.
 *
 * @param blockchainName Name of the blockchain to create
 * @param cfg Configuration of the `Blockchain` class
 * @returns A configured instance of the `Blockchain` class.
 */
export const newBlockchain = async (
  blockchainName: SupportedBlockchain,
  cfg: Omit<BlockchainFactoryConfig, 'baseDir'>,
): Promise<Blockchain> => {
  const { network } = cfg;
  const cachedBlockchain = blockchainCache[blockchainName];

  if (cachedBlockchain && cachedBlockchain[network]) {
    return cachedBlockchain[network];
  }

  const b = Container.get(BackendServiceToken);
  const appDir = await b.appDir();
  const baseDir = path.join(appDir, blockchainName);

  const bc = await factoryMap[blockchainName]({
    baseDir,
    ...cfg,
  });

  if (!blockchainCache[blockchainName]) {
    blockchainCache[blockchainName] = {};
  }

  blockchainCache[blockchainName]![network] = bc;

  return bc;
};
