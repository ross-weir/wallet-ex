import path from 'path';

import {
  Blockchain,
  BlockchainClient,
  RosettaBlockchainClient,
} from '@/blockchains';
import { i18n } from '@/i18n';
import { DependencyManager } from '@/services';
import { Sidecar } from '@/sidecars';
import { getExecutableExt, getNodeFilename } from '@/utils/fs';
import { getOsString } from '@/utils/os';

import { BlockchainFactoryConfig } from '../blockchain';
import {
  BlockchainCapabilities,
  BlockchainSidecarRole,
  BlockchainSyncStatus,
  SidecarEntry,
  SupportedBlockchain,
} from '../types';
import { ErgoExplorerClient } from './ergoExplorerClient';
import { ergoNodeFactory, getErgoNodeStatus } from './ergoNode';
import { ergoRosettaApiFactory } from './ergoRosetta';

const t = i18n.t;

interface ErgoLocalDependencies {
  node: Sidecar;
  rosettaApi: Sidecar;
  client: BlockchainClient;
}

const setupLocalDependencies = async (
  cfg: Omit<BlockchainFactoryConfig, 'useLocalInfra'>,
): Promise<ErgoLocalDependencies> => {
  const node = await ergoNodeFactory(cfg);
  const rosettaApi = await ergoRosettaApiFactory({
    ...cfg,
    nodePort: node.config.rpcPort,
    nodeToken: node.config.rpcToken,
  });
  const client = new RosettaBlockchainClient(
    `http://127.0.0.1:${rosettaApi.config.port}`,
    'Ergo',
    cfg.network,
  );

  return { node, rosettaApi, client };
};

const getDependencyManager = ({
  baseDir,
  useLocalInfra,
}: BlockchainFactoryConfig): DependencyManager | undefined => {
  if (!useLocalInfra) {
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

const getSyncStatus = async (b: Blockchain): Promise<BlockchainSyncStatus> => {
  // create a node api client
  // create a rosetta api client
  const { headersHeight, fullHeight } = await getErgoNodeStatus(b.getNode());
  const status: BlockchainSyncStatus = {
    isSynced: false,
    height: 0,
    description: t('node:starting'),
  };

  // if node fullHeight is null && headerHeight is null
  // return 'node starting up'
  if (!headersHeight && !fullHeight) {
    return status;
  }

  // if node fullHeight is null && headerHeight has value
  // return 'node syncing headers'
  if (!fullHeight && headersHeight) {
    return {
      ...status,
      height: headersHeight,
      description: t('node:syncHeaders'),
    };
  }

  // If we're here then fullHeight & headersHeight must have values
  // if node fullHeight has value < headerHeight
  // return 'node syncing blocks'
  if (fullHeight! < headersHeight!) {
    return {
      ...status,
      height: fullHeight!,
      description: t('node:syncBlocks'),
    };
  }

  const networkStatus = await b.client.networkStatus();
  const indexerHeight = networkStatus.currentBlockIdentifier.index;

  if (fullHeight! - indexerHeight > 2) {
    return {
      isSynced: false,
      height: indexerHeight,
      description: t('node:indexingBlocks'),
    };
  }

  return {
    isSynced: true,
    height: indexerHeight,
    description: t('node:synced'),
  };
};

export const ergoBlockchainFactory = async (
  cfg: BlockchainFactoryConfig,
): Promise<Blockchain> => {
  const { baseDir, useLocalInfra, network } = cfg;
  const sidecars: SidecarEntry[] = [];
  let client: BlockchainClient = new ErgoExplorerClient(network);
  const coin = { symbol: 'ERG', decimals: 9 };

  if (useLocalInfra) {
    const {
      node,
      rosettaApi,
      client: rosettaClient,
    } = await setupLocalDependencies(cfg);

    sidecars.push(
      { role: BlockchainSidecarRole.Node, sidecar: node },
      { role: BlockchainSidecarRole.RosettaApi, sidecar: rosettaApi },
    );

    client = rosettaClient;
  }

  return new Blockchain({
    baseDir,
    coin,
    network,
    sidecars,
    useLocalInfra,
    client,
    capabilities,
    getSyncStatus,
    dependencyManager: getDependencyManager(cfg),
    name: SupportedBlockchain.Ergo,
  });
};
