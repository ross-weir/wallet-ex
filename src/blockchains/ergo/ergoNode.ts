import { DataSerializer } from '../../serialization';
import { Node, NodeConfig } from '../node';

export interface ErgoNodeConfig extends NodeConfig {
  rpcToken: string;
}

export type ErgoNode = Node<ErgoNodeConfig>;

const buildEnvVars = (cfg: ErgoNodeConfig): Record<string, any> => {
  return { BLOCKCHAIN_NETWORK: cfg.network };
};

const buildCliArgs = (node: ErgoNode): string | string[] => [
  `--${node.config.network}`,
  `-c ${node.cfgFilePath}`,
];

// Temporary until we implement Hocon serializer
class ErgoConfigSerializer implements DataSerializer<ErgoNodeConfig> {
  serialize(obj: ErgoNodeConfig): string {
    // required for ergos config parser
    const dataDir = obj.baseDir.replaceAll('\\', '/');
    const cfgLines = [
      `ergo.directory = "${dataDir}/."$\{\BLOCKCHAIN_NETWORK}`,
      `scorex.restApi.bindAddress = "127.0.0.1:${obj.rpcPort}"`,
      `scorex.restApi.apiKeyHash = "${obj.rpcToken}"`,
      `scorex.network.bindAddress = "0.0.0.0:${obj.port}"`,
    ];

    return cfgLines.join('\n');
  }

  deserialize(obj: string): ErgoNodeConfig {
    // shouldn't be a need for this
    throw new Error('Method not implemented.');
  }
}

export const ergoNodeFactory = (cfg: ErgoNodeConfig): Node<ErgoNodeConfig> => {
  return new Node({
    cfg,
    cfgSerializer: new ErgoConfigSerializer(),
    buildEnvVars,
    buildCliArgs,
  });
};
