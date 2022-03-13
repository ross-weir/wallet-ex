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
  protected readonly baseDir: string;
  protected initialized = false;

  public constructor(
    rootDir: string,
    protected readonly network: string,
    protected node?: Node,
  ) {
    this.baseDir = `${rootDir}/${this.getName()}`;
  }

  public static async new(
    this: StaticThis,
    network: string,
  ): Promise<Blockchain> {
    const backend = Container.get(BackendServiceToken);
    const rootDir = await backend.appDir();

    const bc = new this(rootDir, network);
    const nodeCls = bc.getNodeCls();

    if (nodeCls) {
      const nodeCfg: NodeConfig = {
        network,
        baseDir: bc.baseDir,
      };
      bc.node = await nodeCls.new(nodeCfg);
    }

    return bc;
  }

  public getNode(): Node | void {
    return this.node;
  }

  protected setNode(node: Node): void {
    this.node = node;
  }

  public async firstUseSetup(): Promise<void> {
    await this.node?.firstUseSetup();

    // get dependencies
    // mark as first time setup complete?
  }

  public async run(): Promise<void> {
    await this.node?.spawn();

    this.initialized = true;
  }

  public get isInitialized(): boolean {
    return this.initialized;
  }

  public get isNodeSupported(): boolean {
    return false;
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
