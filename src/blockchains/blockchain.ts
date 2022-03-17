import { Sidecar } from '../sidecars';

export type BlockchainSidecarRole = 'node' | 'indexer';

export interface BlockchainFactoryConfig {
  baseDir: string;
  network: string;
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

export class Blockchain {
  private readonly setup: BlockchainSetup;

  constructor(setup: BlockchainSetup) {
    this.setup = setup;
  }

  public async initialize(): Promise<void> {
    for (const { sidecar } of this.setup.sidecars) {
      // what if one fails
      sidecar.spawn();
    }
  }

  public async shutdown(): Promise<void> {
    for (const { sidecar } of this.setup.sidecars) {
      sidecar.kill();
    }
  }

  // is ready?
  // get a api client?
  // get node
}

async function blockchainFactory() {
  // create node
  // create indexer using node stuff
  // setup api client
  // dependency manager
  // determine if first run
  // new Blockchain(sidecars, apiclient)
}
