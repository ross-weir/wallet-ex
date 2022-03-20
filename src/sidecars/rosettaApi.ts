import { EnvironmentVariables } from '../types';
import { getExecutableExt } from '../utils/fs';
import { Sidecar } from './sidecar';
import path from 'path';

export type RosettaApiFactoryConfig = Pick<
  RosettaApiConfig,
  'baseDir' | 'network' | 'nodePort'
>;

export interface RosettaApiConfig {
  baseDir: string;
  blockchain: string;
  network: string;
  port: number;
  nodePort: number;
}

export interface RosettaApiSetup<T extends RosettaApiConfig> {
  cfg: T;
  buildEnvVars?: (rosetta: RosettaApi<T>) => EnvironmentVariables;
}

export class RosettaApi<T extends RosettaApiConfig> extends Sidecar {
  private readonly setup: RosettaApiSetup<T>;

  constructor(setup: RosettaApiSetup<T>) {
    super();
    this.setup = setup;
  }

  public async spawn(): Promise<void> {
    this.initialize({
      path: this.binaryPath,
      args: ['run'],
      env: this.env,
      cwd: this.config.baseDir,
    });

    return super.spawn();
  }

  public get config(): T {
    return this.setup.cfg;
  }

  public get env(): EnvironmentVariables {
    const { buildEnvVars } = this.setup;

    return buildEnvVars ? buildEnvVars(this) : {};
  }

  public get binaryPath(): string {
    const ext = getExecutableExt();
    const { baseDir, blockchain } = this.config;

    return path.join(baseDir, `rosetta-${blockchain}${ext}`);
  }
}
