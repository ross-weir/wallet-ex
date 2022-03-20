import { Blockchain, BlockchainFactoryConfig } from './blockchain';
import { ergoBlockchainFactory } from './ergo/ergoBlockchain';
import { SupportedBlockchain } from './types';
import path from 'path';

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
  cfg: BlockchainFactoryConfig,
): Promise<Blockchain> => {
  cfg.baseDir = path.join(cfg.baseDir, blockchain);

  return factoryMap[blockchain](cfg);
};
