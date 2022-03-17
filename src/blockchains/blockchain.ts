import EventEmitter from 'events';
import { Sidecar } from '../sidecars';

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
  // TODO: blockchainClient
}

export interface SidecarEntry {
  role: BlockchainSidecarRole;
  sidecar: Sidecar;
}

export interface BlockchainSetup extends BlockchainFactoryConfig {
  name: string;
  sidecars: SidecarEntry[];
  // isReady? function
}

export class Blockchain extends EventEmitter {
  private readonly setup: BlockchainSetup;
  private state = BlockchainState.Stopped; // TODO: Do we need to store/restore this between runs?

  constructor(setup: BlockchainSetup) {
    super();
    this.setup = setup;
  }

  public async initialize(): Promise<void> {
    this.updateState(BlockchainState.Initializing);

    for (const { sidecar } of this.setup.sidecars) {
      // what if one fails
      sidecar.spawn();
    }
  }

  public async shutdown(): Promise<void> {
    this.updateState(BlockchainState.ShuttingDown);

    for (const { sidecar } of this.setup.sidecars) {
      sidecar.kill();
    }
  }

  private updateState(newState: BlockchainState): void {
    const prevState = this.state;
    this.state = newState;

    this.emit('stateChanged', newState, prevState);
  }

  // is ready? How do we know it's ready?
  // get a api client?
  // get node
  // ensure deps
}
