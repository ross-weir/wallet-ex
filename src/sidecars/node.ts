import { Container } from 'typedi';
import { BackendService } from '../services';
import { BackendServiceToken } from '../ioc';
import { Sidecar } from './sidecar';
import { DataSerializer } from '../serialization';
import path from 'path';
import { getNodeFilename } from '../utils/fs';
import { EnvironmentVariables } from '../types';

// The minimum args required for node factory functions
// Other config parameters can often be calculated/determined in the factory function.
export interface NodeFactoryConfig {
  baseDir: string;
  network: string;
}

// Extended by blockchain nodes with settings that are specific to that blockchain
export interface NodeConfig extends NodeFactoryConfig {
  cfgFileName?: string;
  blockchain: string;
  port: number;
  rpcPort: number;
}

export interface NodeSetup<T extends NodeConfig> {
  cfg: T;
  cfgSerializer: DataSerializer<T>;
  syncCheck: (node: Node<T>) => Promise<boolean>;
  buildEnvVars?: (cfg: T) => EnvironmentVariables;
  buildCliArgs?: (node: Node<T>) => string | string[];
}

// Events: 'close' | 'error' | 'data'
export class Node<T extends NodeConfig> extends Sidecar {
  private readonly setup: NodeSetup<T>;

  public constructor(setup: NodeSetup<T>) {
    super();
    this.setup = setup;
  }

  public async spawn(): Promise<void> {
    await this.writeConfig();

    this.initialize({
      path: this.binaryPath,
      args: this.args,
      env: this.env,
      cwd: this.config.baseDir,
    });

    return super.spawn();
  }

  public get config(): T {
    return this.setup.cfg;
  }

  public get args(): string | string[] {
    const { buildCliArgs } = this.setup;

    return buildCliArgs ? buildCliArgs(this) : '';
  }

  public get env(): EnvironmentVariables {
    const { buildEnvVars, cfg } = this.setup;

    return buildEnvVars ? buildEnvVars(cfg) : {};
  }

  public get cfgFilePath(): string {
    const { cfgFileName, baseDir } = this.setup.cfg;

    return path.join(baseDir, cfgFileName || 'node_conf');
  }

  private get backend(): BackendService {
    return Container.get(BackendServiceToken);
  }

  private async writeConfig(): Promise<void> {
    const { cfgSerializer, cfg } = this.setup;
    const cfgStr = cfgSerializer.serialize(cfg);

    return this.backend.writeFile(this.cfgFilePath, cfgStr);
  }

  private get binaryPath(): string {
    const { baseDir, blockchain } = this.setup.cfg;

    return path.join(baseDir, getNodeFilename(blockchain));
  }
}
