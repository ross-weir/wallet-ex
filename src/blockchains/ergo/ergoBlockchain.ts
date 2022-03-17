import { Sidecar } from '../../sidecars';
import {
  Blockchain,
  BlockchainFactoryConfig,
  BlockchainSidecarRole,
  SidecarEntry,
} from '../blockchain';
import { SupportedBlockchain } from '../types';
import { ergoNodeFactory } from './ergoNode';
import { ergoRosettaApiFactory } from './ergoRosetta';
import { ErgoExplorerClient } from './explorerClient';

interface ErgoLocalDependencies {
  node: Sidecar;
  rosettaApi: Sidecar;
}

const setupLocalDependencies = async (
  cfg: Omit<BlockchainFactoryConfig, 'useLocalNode'>,
): Promise<ErgoLocalDependencies> => {
  const node = await ergoNodeFactory(cfg);
  const rosettaApi = await ergoRosettaApiFactory({
    ...cfg,
    nodePort: node.config.rpcPort,
    nodeToken: node.config.rpcToken,
  });

  return { node, rosettaApi };
};

export const ergoBlockchainFactory = async ({
  baseDir,
  network,
  useLocalNode,
}: BlockchainFactoryConfig): Promise<Blockchain> => {
  const sidecars: SidecarEntry[] = [];
  let client = new ErgoExplorerClient(0);

  if (useLocalNode) {
    const { node, rosettaApi } = await setupLocalDependencies({
      baseDir,
      network,
    });

    sidecars.push(
      { role: BlockchainSidecarRole.Node, sidecar: node },
      { role: BlockchainSidecarRole.RosettaApi, sidecar: rosettaApi },
    );

    // TODO configure client from rosettaApi
    // client = new RosettaApiClient();
  }

  return new Blockchain({
    baseDir,
    network,
    sidecars,
    useLocalNode,
    client,
    name: SupportedBlockchain.Ergo,
  });
};
