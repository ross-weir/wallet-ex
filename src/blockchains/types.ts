import { Sidecar } from '@/sidecars';

export enum SupportedBlockchain {
  Ergo = 'ergo',
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
export interface BlockchainSyncStatus {
  isSynced: boolean;
  height: number;
  // Human readable description of the blockchain status.
  description: string;
}

export enum BlockchainState {
  Stopped = 'stopped',
  CheckingDependencies = 'checkingDependencies',
  Initializing = 'initializing',
  Running = 'running',
  ShuttingDown = 'shuttingDown',
  Error = 'error',
}

export interface Bip44 {
  coinType: number;
  symbol: string;
  name: string;
}
