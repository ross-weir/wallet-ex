import EventEmitter from 'events';
import { DependencyManager } from '../services';
import {
  BlockchainCapabilities,
  SidecarEntry,
  BlockchainStatus,
  BlockchainState,
  BlockchainSidecarRole,
} from './types';
import { BlockchainClient } from './blockchainClient';
import {
  ImproperlyConfiguredError,
  UnsupportedOperationError,
} from '../errors';
import { Node, NodeConfig } from '../sidecars';

export interface BlockchainFactoryConfig {
  baseDir: string;
  network: string;
  useLocalNode: boolean;
}

export interface BlockchainConfig extends BlockchainFactoryConfig {
  name: string;
  sidecars: SidecarEntry[];
  client: BlockchainClient;
  dependencyManager?: DependencyManager;
  capabilities: BlockchainCapabilities;
  statusInterval?: number;
  // Only used for local infrastructure, this is basically the status of the blockchain syncing
  getStatus?: (b: Blockchain) => Promise<BlockchainStatus>;
}

// Events: 'stateChanged'
export class Blockchain extends EventEmitter {
  private readonly config: BlockchainConfig;
  private _state = BlockchainState.Stopped; // TODO: Do we need to store/restore this between runs?

  constructor(config: BlockchainConfig) {
    super();
    this.config = config;
  }

  public async initialize(): Promise<void> {
    this.updateState(BlockchainState.Initializing);
    const { sidecars, dependencyManager } = this.config;

    this.updateState(BlockchainState.CheckingDependencies);

    await dependencyManager?.ensureDependencies();

    this.updateState(BlockchainState.Initializing);

    await Promise.all(sidecars.map(({ sidecar }) => sidecar.spawn()));

    this.updateState(BlockchainState.Ready);
  }

  public async shutdown(): Promise<void> {
    this.updateState(BlockchainState.ShuttingDown);

    for (const { sidecar } of this.config.sidecars) {
      sidecar.kill();
    }
  }

  public async getStatus(): Promise<BlockchainStatus> {
    if (!this.hasLocalNode) {
      throw new UnsupportedOperationError(
        `getStatus is not supported for ${this.config.name}, no local node`,
      );
    }

    const { getStatus } = this.config;

    if (!getStatus) {
      throw new ImproperlyConfiguredError(
        `getStatus function not provided for blockchain: ${this.config.name}`,
      );
    }

    return getStatus(this);
  }

  public get client(): BlockchainClient {
    return this.config.client;
  }

  public get state(): BlockchainState {
    return this._state;
  }

  public get hasLocalNode(): boolean {
    return this.config.useLocalNode;
  }

  public getNode<T extends NodeConfig>(): Node<T> {
    if (!this.hasLocalNode) {
      throw new UnsupportedOperationError('local node is not supported');
    }

    const sidecarEntry = this.config.sidecars.find(
      (s) => s.role === BlockchainSidecarRole.Node,
    );

    if (!sidecarEntry) {
      throw new ImproperlyConfiguredError('unable to find node sidecar');
    }

    return sidecarEntry.sidecar as Node<T>;
  }

  private updateState(newState: BlockchainState, eventData?: any): void {
    const prevState = this._state;
    this._state = newState;

    this.emit('stateChanged', newState, prevState, eventData);
  }
}
