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

const supportedNetworksMap: Record<SupportedBlockchain, string[]> = {
  [SupportedBlockchain.Ergo]: ['mainnet', 'testnet'],
};

/**
 * @returns Array of supported blockchains/coins
 */
export const getSupportedBlockchains = (): SupportedBlockchain[] =>
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
): string[] => supportedNetworksMap[blockchain];

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
  blockchain: SupportedBlockchain,
  network: string,
): string => iconMap[blockchain][network];

type NetworkToBlockchainMap = Record<string, Blockchain>;
const blockchainCache: Partial<
  Record<SupportedBlockchain, NetworkToBlockchainMap>
> = {};

/**
 * Get an instance of `Blockchain` for the supplied blockchainId.
 *
 * @param blockchain name of the blockchain
 * @param network Network of the blockchain
 * @returns An instance of `Blockchain` if it has been created
 * otherwise `undefined`.
 */
export const getBlockchain = (
  blockchain: SupportedBlockchain,
  network: string,
): Blockchain | undefined => {
  if (!blockchainCache[blockchain]) {
    return;
  }

  return blockchainCache[blockchain]![network];
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
