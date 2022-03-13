import { Node, NodeConfig } from '../node';

export interface ErgoNodeConfig extends NodeConfig {
  network: string;
  rpcToken: string;
}

export class ErgoNode extends Node {
  protected get blockchain(): string {
    return 'ergo';
  }

  protected async serializeConfig(cfg: ErgoNodeConfig): Promise<string> {
    // required for ergos config parser
    const dataDir = this.cfg.baseDir.replaceAll('\\', '/');
    const cfgLines = [
      `ergo.directory = "${dataDir}/."$\{\BLOCKCHAIN_NETWORK}`,
      `scorex.restApi.bindAddress = "127.0.0.1:${cfg.rpcPort}"`,
      `scorex.restApi.apiKeyHash = "${cfg.rpcToken}"`,
      `scorex.network.bindAddress = "0.0.0.0:${cfg.port}"`,
    ];

    return cfgLines.join('\n');
  }

  protected get configFileName(): string {
    return 'node.conf';
  }

  protected get envVars(): Record<string, any> {
    return { BLOCKCHAIN_NETWORK: this.config.network };
  }

  protected get cliArgs(): string | string[] {
    return [
      `--${this.config.network}`,
      '-c',
      `${this.cfg.baseDir}/${this.configFileName}`,
    ];
  }
}
