import Container from 'typedi';
import { BackendServiceToken } from '../../ioc';
import { DataSerializer } from '../../serialization';
import { Node, NodeConfig, NodeFactoryConfig } from '../../sidecars';
import { EnvironmentVariables } from '../../types';
import { SupportedBlockchain } from '../types';

export interface ErgoNodeConfig extends NodeConfig {
  rpcTokenHash: string;
  rpcToken: string;
}

export type ErgoNode = Node<ErgoNodeConfig>;

// call API, check if sync'd
const syncCheck = async (node: ErgoNode): Promise<boolean> => false;

const buildEnvVars = (cfg: ErgoNodeConfig): EnvironmentVariables => ({
  BLOCKCHAIN_NETWORK: cfg.network,
});

const buildCliArgs = (node: ErgoNode): string | string[] => [
  `--${node.config.network}`,
  '-c',
  node.cfgFilePath,
];

// Temporary until we implement Hocon serializer
class ErgoConfigSerializer implements DataSerializer<ErgoNodeConfig> {
  serialize(obj: ErgoNodeConfig): string {
    // required for ergos config parser
    const dataDir = obj.baseDir.replaceAll('\\', '/');
    const cfgLines = [
      `ergo.directory = "${dataDir}/."$\{\BLOCKCHAIN_NETWORK}`,
      `scorex.restApi.bindAddress = "127.0.0.1:${obj.rpcPort}"`,
      `scorex.restApi.apiKeyHash = "${obj.rpcTokenHash}"`,
      `scorex.network.bindAddress = "0.0.0.0:${obj.port}"`,
    ];

    return cfgLines.join('\n');
  }

  deserialize(obj: string): ErgoNodeConfig {
    // shouldn't be a need for this
    throw new Error('Method not implemented.');
  }
}

export const ergoNodeFactory = async ({
  baseDir,
  network,
}: NodeFactoryConfig): Promise<ErgoNode> => {
  const b = Container.get(BackendServiceToken);
  const rpcPort = await b.getFreePort();
  const port = await b.getFreePort();
  const cfg: ErgoNodeConfig = {
    baseDir,
    network,
    rpcPort,
    port,
    blockchain: SupportedBlockchain.Ergo,
    // Could probably auto-generate these token values
    rpcToken: 'hello',
    rpcTokenHash:
      '324dcf027dd4a30a932c441f365a25e86b173defa4b8e58948253471b81b72cf',
  };

  return new Node({
    cfg,
    cfgSerializer: new ErgoConfigSerializer(),
    syncCheck,
    buildEnvVars,
    buildCliArgs,
  });
};
