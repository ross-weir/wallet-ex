import { Container } from 'typedi';
import { BackendService } from '../services';
import { BackendServiceToken } from '../ioc';
import { Node, NodeConfig } from './node';

export interface BlockchainDependency {
  downloadUrl: string;
  localPath: string;
  checksum?: string;
  metadataUrl?: string;
  description?: string;
}

type StaticThis = {
  new (rootDir: string, network: string): Blockchain;
};

// TODO: create dependency manager
// dependencyManager.ensureDeps(); etc
export abstract class Blockchain {
  protected readonly network: string;
  protected readonly baseDir: string;
  protected node?: Node;
  protected initialized = false;
  protected useNode = false;

  public constructor(rootDir: string, network: string, node?: Node) {
    this.network = network;
    this.node = node;
    this.baseDir = `${rootDir}${this.getName()}`;
  }

  public static async new(
    this: StaticThis,
    network: string,
    extraNodeCfg: Record<string, any> = {},
  ): Promise<Blockchain> {
    const backend = Container.get(BackendServiceToken);
    const rootDir = await backend.appDir();
    const bc = new this(rootDir, network);
    const nodeCls = bc.getNodeCls();

    if (nodeCls) {
      const nodeCfg: NodeConfig = {
        network,
        baseDir: bc.baseDir,
        ...extraNodeCfg,
      };
      bc.node = await nodeCls.new(nodeCfg);
    }

    return bc;
  }

  public withNode(): Blockchain {
    this.useNode = true;

    return this;
  }

  public getNode(): Node | void {
    return this.node;
  }

  public async firstUseSetup(): Promise<void> {
    if (this.isNodeSupported) {
      await this.node?.firstUseSetup();
    }

    // get dependencies
    // mark as first time setup complete?
  }

  public async initialize(): Promise<void> {
    if (this.useNode) {
      await this.node?.spawn();
    }

    this.initialized = true;
  }

  public get isInitialized(): boolean {
    return this.initialized;
  }

  public get isNodeSupported(): boolean {
    return !!this.getNodeCls();
  }

  public abstract getName(): string;

  public getNodeCls(): typeof Node | void {}

  protected dependenciesList(): BlockchainDependency[] {
    return [];
  }

  protected get backend(): BackendService {
    return Container.get(BackendServiceToken);
  }
}
