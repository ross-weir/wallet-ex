import Container from 'typedi';
import { BackendServiceToken } from '@/ioc';
import {
  RosettaApi,
  RosettaApiConfig,
  RosettaApiFactoryConfig,
} from '@/sidecars/rosettaApi';
import { EnvironmentVariables } from '@/types';
import path from 'path';
import { SupportedBlockchain } from '../types';

export interface ErgoRosettaApiConfig extends RosettaApiConfig {
  nodeToken: string;
}

export type ErgoRosettaApi = RosettaApi<ErgoRosettaApiConfig>;

type RosettaFactoryConfig = RosettaApiFactoryConfig & { nodeToken: string };

const buildEnvVars = (rosetta: ErgoRosettaApi): EnvironmentVariables => {
  const { network, port, baseDir, nodePort, nodeToken } = rosetta.config;

  return {
    ERGO_ROSETTA_MODE: 'ONLINE',
    ERGO_NETWORK: network,
    ERGO_ROSETTA_PORT: port.toString(),
    ROSETTA_NODE_PORT: nodePort.toString(),
    ROSETTA_NODE_TOKEN: nodeToken, // TODO: not implemented in rosetta-ergo yet
    ERGO_ROSETTA_DATA_DIR: path.join(baseDir, '.' + network, 'rosetta'),
    // This is not needed for us, it's only used in rosetta when rosetta is starting a node.
    // We take care of node management in wallet-ex.
    ERGO_CONFIG_DIR: '',
  };
};

export const ergoRosettaApiFactory = async (
  rosetta: RosettaFactoryConfig,
): Promise<ErgoRosettaApi> => {
  const b = Container.get(BackendServiceToken);
  const port = await b.getFreePort();
  const cfg: ErgoRosettaApiConfig = {
    port,
    blockchain: SupportedBlockchain.Ergo,
    ...rosetta,
  };

  return new RosettaApi({
    cfg,
    buildEnvVars,
  });
};
