import { Container } from 'typedi';
import { BackendService } from '../services';
import { BackendServiceToken } from '../ioc';
import { Sidecar } from '../sidecars';
import { getNodeBinaryPath } from './utils';

export interface BaseNodeConfig {
  baseDir: string;
  network: string;
  port?: number;
  rpcPort?: number;
}

export type NodeConfig = BaseNodeConfig & Record<string, any>;
type StaticThis = { new (cfg: NodeConfig): Node };

export class Node {
  private _sidecar?: Sidecar;

  public constructor(protected readonly cfg: NodeConfig) {}

  public async firstUseSetup(): Promise<void> {}

  public static async new(this: StaticThis, cfg: NodeConfig): Promise<Node> {
    const backend = Container.get(BackendServiceToken);

    // should we calculate the ports just before running in spawn()?
    if (!cfg.port) {
      cfg.port = await backend.getFreePort();
    }

    if (!cfg.rpcPort) {
      cfg.rpcPort = await backend.getFreePort();
    }

    const node = new this(cfg);

    node.writeConfig(cfg);

    return node;
  }

  public async spawn(): Promise<Sidecar> {
    await this.beforeSpawn();
    const path = await this.binaryPath();

    this._sidecar = new Sidecar({
      path,
      args: this.cliArgs,
      env: this.envVars,
    });

    await this._sidecar.spawn();

    return this._sidecar;
  }

  public get config(): NodeConfig {
    return this.cfg;
  }

  public get port(): number {
    return this.cfg.port!;
  }

  public get rpcPort(): number {
    return this.cfg.rpcPort!;
  }

  public get sidecar(): Sidecar | undefined {
    return this._sidecar;
  }

  protected get backend(): BackendService {
    return Container.get(BackendServiceToken);
  }

  protected get blockchain(): string {
    return '';
  }

  protected get cliArgs(): string | string[] {
    return '';
  }

  protected get envVars(): Record<string, any> {
    return {};
  }

  protected async serializeConfig(cfg: NodeConfig): Promise<string> {
    return '';
  }

  protected get configFileName(): string {
    return '';
  }

  /**
   * Allow nodes to perform setup actions before spawning the process.
   */
  protected async beforeSpawn(): Promise<void> {}

  /**
   * Allows concrete implementations of nodes to perform specific config setup.
   *
   * @param cfg The config object to ammend.
   */
  protected async setupConfig(cfg: NodeConfig): Promise<NodeConfig> {
    return cfg;
  }

  private async writeConfig(cfg: NodeConfig): Promise<void> {
    const cfgStr = await this.serializeConfig(cfg);

    return this.backend.writeFile(
      `${this.cfg.baseDir}/${this.configFileName}`,
      cfgStr,
    );
  }

  private async binaryPath(): Promise<string> {
    return getNodeBinaryPath(this.cfg.baseDir, this.blockchain);
  }
}
