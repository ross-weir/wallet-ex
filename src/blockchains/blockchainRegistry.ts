import { Blockchain, BlockchainFactoryConfig } from './blockchain';
import { ergoBlockchainFactory } from './ergo/ergoBlockchain';
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
  cfg: BlockchainFactoryConfig,
): Promise<Blockchain> => factoryMap[blockchain](cfg);
