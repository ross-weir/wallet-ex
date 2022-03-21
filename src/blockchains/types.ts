import { Sidecar } from '../sidecars';

export enum SupportedBlockchain {
  Ergo = 'Ergo',
}

export interface BlockchainCapabilities {
  localNode: boolean;
  multiSig: boolean;
  staking: boolean;
}

export enum BlockchainSidecarRole {
  Node = 'node',
  RosettaApi = 'rosettaApi',
  Unknown = 'unknown',
}

export interface SidecarEntry {
  role: BlockchainSidecarRole;
  sidecar: Sidecar;
}

// When running full node/local infra.
export interface BlockchainStatus {
  isSynced: boolean;
  height: number;
  // Human readable description of the blockchain status.
  description: string;
}

export enum BlockchainState {
  Stopped = 'stopped',
  CheckingDependencies = 'checkingDependencies',
  Initializing = 'initializing',
  Ready = 'ready',
  ShuttingDown = 'shuttingDown',
  Error = 'error',
}
