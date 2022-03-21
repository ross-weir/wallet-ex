import { Sidecar } from '../../sidecars';
import { Blockchain, BlockchainFactoryConfig } from '../blockchain';
import {
  BlockchainCapabilities,
  BlockchainSidecarRole,
  BlockchainStatus,
  SidecarEntry,
  SupportedBlockchain,
} from '../types';
import { ergoNodeFactory } from './ergoNode';
import { ergoRosettaApiFactory } from './ergoRosetta';
import { ErgoExplorerClient } from './ergoExplorerClient';
import { DependencyManager } from '../../services';
import { getExecutableExt, getNodeFilename } from '../../utils/fs';
import { getOsString } from '../../utils/os';
import path from 'path';

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

const getDependencyManager = ({
  baseDir,
  useLocalNode,
}: BlockchainFactoryConfig): DependencyManager | undefined => {
  if (!useLocalNode) {
    return;
  }

  const os = getOsString();
  const exeExt = getExecutableExt();
  const deps = [
    {
      shortName: 'ergo node',
      downloadUrl: `https://github.com/ross-weir/ergo-portable/releases/download/v4.0.23/ergo-${os}-v4.0.23${exeExt}`,
      localPath: path.join(baseDir, getNodeFilename(SupportedBlockchain.Ergo)),
      digest:
        '523119fdcd15ce5eaeb17a299ecdce60f212e0ee643a598a7762c264d3cd752d',
    },
    // TODO: rosetta api
  ];

  return new DependencyManager(deps);
};

const capabilities: BlockchainCapabilities = {
  localNode: true,
  multiSig: true,
  staking: false,
};

let counter = 0;

const getStatus = async (b: Blockchain): Promise<BlockchainStatus> => {
  counter += 100;
  return {
    isSynced: false,
    height: 400,
    description: `New height ${counter}`,
  };
};

export const ergoBlockchainFactory = async (
  cfg: BlockchainFactoryConfig,
): Promise<Blockchain> => {
  const { baseDir, useLocalNode, network } = cfg;
  const sidecars: SidecarEntry[] = [];
  let client = new ErgoExplorerClient(0);

  if (useLocalNode) {
    const { node, rosettaApi } = await setupLocalDependencies(cfg);

    sidecars.push(
      { role: BlockchainSidecarRole.Node, sidecar: node },
      { role: BlockchainSidecarRole.RosettaApi, sidecar: rosettaApi },
    );

    // TODO configure client from rosettaApi
    // client = RosettaApiClient.FromSidecar(rosettaApi);
  }

  return new Blockchain({
    baseDir,
    network,
    sidecars,
    useLocalNode,
    client,
    capabilities,
    getStatus,
    dependencyManager: getDependencyManager(cfg),
    name: SupportedBlockchain.Ergo,
  });
};
