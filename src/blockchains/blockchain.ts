import EventEmitter from 'events';
import { DependencyManager } from '../services';
import { Sidecar } from '../sidecars';
import { BlockchainClient } from './blockchainClient';

export interface BlockchainCapabilities {
  localNode: boolean;
  multiSig: boolean;
  staking: boolean;
}

export enum BlockchainState {
  Stopped = 'stopped',
  CheckingDependencies = 'checkingDependencies',
  Initializing = 'initializing',
  Ready = 'ready',
  Syncing = 'syncing',
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
  capabilities: BlockchainCapabilities;
}

// Events: 'stateChanged' | 'log'
export class Blockchain extends EventEmitter {
  private readonly config: BlockchainConfig;
  private monitorHandle?: number;
  private _state = BlockchainState.Stopped; // TODO: Do we need to store/restore this between runs?
  private _lastLog = '';

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

  public async monitor(): Promise<void> {
    // check if synced, raise event if so
    // raise event that we're syncing
    // consider the situation where we aren't running a node - actually, do we need to?
    this.monitorHandle = window.setInterval(() => {}, 3000);
  }

  public get client(): BlockchainClient {
    return this.config.client;
  }

  public get state(): BlockchainState {
    return this._state;
  }

  public get lastLog(): string {
    return this._lastLog;
  }

  public get isMonitoring(): boolean {
    return !!this.monitorHandle;
  }

  public get hasLocalNode(): boolean {
    return this.config.useLocalNode;
  }

  private updateState(newState: BlockchainState, eventData?: any): void {
    const prevState = this._state;
    this._state = newState;

    this.emit('stateChanged', newState, prevState, eventData);
  }
}
