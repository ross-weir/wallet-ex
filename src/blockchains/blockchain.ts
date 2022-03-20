import EventEmitter from 'events';
import { DependencyManager } from '../services';
import { Sidecar } from '../sidecars';
import { BlockchainClient } from './blockchainClient';

export enum BlockchainState {
  Stopped = 'stopped',
  CheckingDependencies = 'checkingDependencies',
  StartingDependencies = 'startingDependencies',
  Initializing = 'initializing',
  Ready = 'ready',
  NodeSyncing = 'nodeSyncing',
  Indexing = 'indexing',
  ShuttingDown = 'shuttingDown',
  Error = 'error',
}

export enum BlockchainSidecarRole {
  Node = 'node',
  RosettaApi = 'rosettaApi',
  Unknown = 'unknown',
}

export type BlockchainEvent = 'stateChanged';

export interface BlockchainFactoryConfig {
  baseDir: string;
  network: string;
  useLocalNode: boolean;
}

export interface SidecarEntry {
  role: BlockchainSidecarRole;
  sidecar: Sidecar;
}

export interface BlockchainConfig extends BlockchainFactoryConfig {
  name: string;
  sidecars: SidecarEntry[];
  client: BlockchainClient;
  dependencyManager?: DependencyManager;
  // isReady? function
}

export class Blockchain extends EventEmitter {
  private readonly config: BlockchainConfig;
  private state = BlockchainState.Stopped; // TODO: Do we need to store/restore this between runs?

  constructor(config: BlockchainConfig) {
    super();
    this.config = config;
  }

  public async initialize(): Promise<void> {
    this.updateState(BlockchainState.Initializing);
    const { sidecars, dependencyManager } = this.config;

    this.updateState(BlockchainState.CheckingDependencies);

    await dependencyManager?.ensureDependencies();

    this.updateState(BlockchainState.StartingDependencies);

    await Promise.all(sidecars.map(({ sidecar }) => sidecar.spawn()));

    this.updateState(BlockchainState.Ready);
  }

  public async shutdown(): Promise<void> {
    this.updateState(BlockchainState.ShuttingDown);

    for (const { sidecar } of this.config.sidecars) {
      sidecar.kill();
    }
  }

  public get client(): BlockchainClient {
    return this.config.client;
  }

  private updateState(newState: BlockchainState, eventData?: any): void {
    const prevState = this.state;
    this.state = newState;

    this.emit('stateChanged', newState, prevState, eventData);
  }

  // is ready? How do we know it's ready?
  // get node
}
