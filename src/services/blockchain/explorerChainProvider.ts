import { ChainProvider } from './chainProvider';

export class ExplorerChainProvider implements ChainProvider {
  private readonly baseEndpoint: string;

  constructor(network: number) {
    this.baseEndpoint = this.getBaseEndpoint(network);
  }

  async balanceForAddress(address: string): Promise<number> {
    return this.doRequest(`api/v1/addresses/${address}/balance/confirmed`).then(
      (res) => res.nanoErgs,
    );
  }

  private async doRequest(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseEndpoint}/${endpoint}`);

      if (!response.ok) {
        throw new Error(
          `Bad network response from: ${this.baseEndpoint}/${endpoint}`,
        );
      }

      return response.json();
    } catch (e) {
      console.error(e);
    }
  }

  private getBaseEndpoint(network: number): string {
    switch (network) {
      case 0:
        return 'https://api.ergoplatform.com';
      case 1:
        return '';
      default:
        throw new Error(
          `Unsupported explorer API network: ${network}, 0 = mainnet, 1 = testnet`,
        );
    }
  }
}
