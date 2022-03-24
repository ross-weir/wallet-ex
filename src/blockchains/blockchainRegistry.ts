import path from 'path';
import Container from 'typedi';

import { UninitializedError } from '@/errors';
import { BackendServiceToken } from '@/ioc';
import { getAppConfig } from '@/storage';

import { Blockchain, BlockchainFactoryConfig } from './blockchain';
import { ergoBlockchainFactory } from './ergo';
import { SupportedBlockchain } from './types';

type BlockchainFactoryFn = (
  cfg: BlockchainFactoryConfig,
) => Promise<Blockchain>;

const factoryMap: Record<SupportedBlockchain, BlockchainFactoryFn> = {
  [SupportedBlockchain.Ergo]: ergoBlockchainFactory,
};

export const getSupportedBlockchains = (): string[] =>
  Object.keys(SupportedBlockchain);

export const getBlockchain = async (
  blockchain: SupportedBlockchain,
  cfg: Omit<BlockchainFactoryConfig, 'baseDir'>,
): Promise<Blockchain> => {
  const b = Container.get(BackendServiceToken);
  const appDir = await b.appDir();
  const baseDir = path.join(appDir, blockchain);

  return factoryMap[blockchain]({
    baseDir,
    ...cfg,
  });
};

const blockchainCache: Partial<Record<SupportedBlockchain, Blockchain>> = {};

export const getConfiguredBlockchain = async (): Promise<Blockchain> => {
  const appConfig = getAppConfig();
  const cfg = await appConfig.get();

  if (!cfg) {
    throw new UninitializedError();
  }

  const { blockchain, useLocalNode, network } = cfg;
  const cachedEntry = blockchainCache[blockchain!];

  if (cachedEntry) {
    return cachedEntry;
  }

  const bc = await getBlockchain(blockchain!, {
    useLocalNode,
    network,
  });

  blockchainCache[blockchain!] = bc;

  return bc;
};
