import { BlockchainClient } from './blockchainClient';
import { JSONBI } from '../../json';

export class ExplorerClient extends BlockchainClient {
  private readonly baseEndpoint: string;

  constructor(network: number) {
    super();
    this.baseEndpoint = this.getBaseEndpoint(network);
  }

  async balanceForAddress(address: string): Promise<number> {
    return this.doRequest(`api/v1/addresses/${address}/balance/confirmed`).then(
      (res) => res.nanoErgs,
    );
  }

  submitTx(): void {
    throw new Error('Method not implemented.');
  }

  private async doRequest(endpoint: string): Promise<any> {
    // Just bubble up any errors for now
    const response = await fetch(`${this.baseEndpoint}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Explorer API request failed: ${await response.text()}`);
    }

    return JSONBI.parse(await response.text());
  }

  private getBaseEndpoint(network: number): string {
    switch (network) {
      case 0:
        return 'https://api.ergoplatform.com';
      case 1:
        return 'https://api-testnet.ergoplatform.com';
      default:
        throw new Error(
          `Unsupported explorer API network: ${network}, 0 = mainnet, 1 = testnet`,
        );
    }
  }
}
