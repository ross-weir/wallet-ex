import EventEmitter from 'events';
import { Sidecar } from '../sidecars';
import { BlockchainClient } from './blockchainClient';

export enum BlockchainState {
  Stopped = 'stopped',
  CheckingDependencies = 'checkingDependencies',
  InstallingDependencies = 'installingDependencies',
  Initializing = 'initializing',
  NodeSyncing = 'nodeSyncing',
  Indexing = 'indexing',
  ShuttingDown = 'shuttingDown',
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

    for (const { sidecar } of this.config.sidecars) {
      // what if one fails
      sidecar.spawn();
    }
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

  private updateState(newState: BlockchainState): void {
    const prevState = this.state;
    this.state = newState;

    this.emit('stateChanged', newState, prevState);
  }

  // is ready? How do we know it's ready?
  // get node
  // ensure deps
}
