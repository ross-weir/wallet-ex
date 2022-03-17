import { Container } from 'typedi';
import { BackendService } from '../services';
import { BackendServiceToken } from '../ioc';
import { Sidecar } from '../sidecars';
import { DataSerializer } from '../serialization';
import EventEmitter from 'events';
import path from 'path';
import { getExecutableExt } from '../utils/fs';

// Extended by blockchain nodes with settings that are specific to that blockchain
export interface NodeConfig {
  baseDir: string;
  cfgFileName?: string;
  network: string;
  blockchain: string;
  port: number;
  rpcPort: number;
}

export interface NodeSetup<T extends NodeConfig> {
  cfg: T;
  cfgSerializer: DataSerializer<T>;
  buildEnvVars?: (cfg: T) => Record<string, any>;
  buildCliArgs?: (cfg: Node<T>) => string | string[];
  onFirstUse?: (node: Node<T>) => void;
  onBeforeSpawn?: (node: Node<T>) => void;
}

// Events: 'close' | 'error'
export class Node<T extends NodeConfig> extends EventEmitter {
  private _sidecar?: Sidecar;
  private readonly setup: NodeSetup<T>;

  public constructor(setup: NodeSetup<T>) {
    super();
    this.setup = setup;
  }

  public async firstUseSetup(): Promise<void> {}

  public async spawn(): Promise<Sidecar> {
    await this.writeConfig();

    const { buildCliArgs, buildEnvVars, cfg } = this.setup;
    const args = buildCliArgs ? buildCliArgs(this) : '';
    const env = buildEnvVars && buildEnvVars(cfg);

    this._sidecar = new Sidecar({
      path: this.binaryPath(),
      args,
      env,
    });

    this._sidecar.on('close', (data) => this.emit('close', data));
    this._sidecar.on('error', (data) => this.emit('error', data));

    await this._sidecar.spawn();

    return this._sidecar;
  }

  public get config(): T {
    return this.setup.cfg;
  }

  public get sidecar(): Sidecar | undefined {
    return this._sidecar;
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

  private binaryPath(): string {
    const ext = getExecutableExt();
    const { baseDir, blockchain } = this.setup.cfg;

    return path.join(baseDir, `${blockchain}_node${ext}`);
  }
}
