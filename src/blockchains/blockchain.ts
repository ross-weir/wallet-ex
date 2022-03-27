import EventEmitter from 'events';

import { ImproperlyConfiguredError, UnsupportedOperationError } from '@/errors';
import {
  BlockchainCapabilities,
  BlockchainClient,
  BlockchainSidecarRole,
  BlockchainState,
  BlockchainSyncStatus,
  SidecarEntry,
} from '@/internal';
import { DependencyManager } from '@/services';
import { Node, NodeConfig } from '@/sidecars';

export interface BlockchainFactoryConfig {
  baseDir: string;
  network: string;
  useLocalInfra: boolean;
}

export interface BlockchainConfig extends BlockchainFactoryConfig {
  name: string;
  sidecars: SidecarEntry[];
  client: BlockchainClient;
  dependencyManager?: DependencyManager;
  capabilities: BlockchainCapabilities;
  statusInterval?: number;
  // Only used for local infrastructure, this is basically the status of the blockchain syncing
  getSyncStatus?: (b: Blockchain) => Promise<BlockchainSyncStatus>;
}

/**
 * `Blockchain` is a facade class that encompasses
 * many different parts of a blockchain.
 *
 * It's a way to group things like sidecar infrastrcture,
 * API clients, blockchain status updates, etc.
 *
 * Emits events: 'stateChanged'
 */
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

    this.updateState(BlockchainState.Running);
  }

  public async shutdown(): Promise<void> {
    this.updateState(BlockchainState.ShuttingDown);

    for (const { sidecar } of this.config.sidecars) {
      sidecar.kill();
    }
  }

  public async getSyncStatus(): Promise<BlockchainSyncStatus> {
    if (!this.hasLocalInfra) {
      throw new UnsupportedOperationError(
        `getStatus is not supported for ${this.config.name}, no local node`,
      );
    }

    const { getSyncStatus } = this.config;

    if (!getSyncStatus) {
      throw new ImproperlyConfiguredError(
        `getStatus function not provided for blockchain: ${this.config.name}`,
      );
    }

    return getSyncStatus(this);
  }

  public get client(): BlockchainClient {
    return this.config.client;
  }

  public get state(): BlockchainState {
    return this._state;
  }

  public get hasLocalInfra(): boolean {
    return this.config.useLocalInfra;
  }

  public getNode<T extends NodeConfig>(): Node<T> {
    if (!this.hasLocalInfra) {
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
