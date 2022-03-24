import {
  AccountBalanceRequest,
  AccountBalanceResponse,
  AccountCoinsRequest,
  AccountCoinsResponse,
  BlockIdentifier,
  Currency,
  NetworkRequest,
  NetworkStatusResponse,
} from '@wallet-ex/rosetta-api-client';

import { BlockchainClient, OmitNetwork } from '@/blockchains/blockchainClient';
import { ERG_DECIMAL_PLACES } from '@/ergo';
import { JSONBI } from '@/json';

import { ExplorerBalanceConfirmedResponse } from './types';

// Ergo explorer implementation of Blockchain client,
// this is required to support light clients.
// When there's a deployed usable rosetta implementation we can
// probably move to that. Until then use the ergo explorer.
export class ErgoExplorerClient implements BlockchainClient {
  private readonly baseEndpoint: string;

  constructor(private readonly network: string) {
    this.baseEndpoint = this.getBaseEndpoint(this.network);
  }

  async networkStatus(
    networkRequest?: OmitNetwork<NetworkRequest>,
  ): Promise<NetworkStatusResponse> {
    throw new Error('Method not implemented.');
  }

  async accountBalance(
    accountBalanceRequest: OmitNetwork<AccountBalanceRequest>,
  ): Promise<AccountBalanceResponse> {
    const address = accountBalanceRequest.accountIdentifier.address;
    const { nanoErgs } = await this.doRequest<ExplorerBalanceConfirmedResponse>(
      `api/v1/addresses/${address}/balance/confirmed`,
    );

    return {
      ...this.blockId,
      balances: [{ currency: this.ergCurrency, value: nanoErgs.toString() }],
    };
  }

  async accountCoins(
    accountCoinsRequest: OmitNetwork<AccountCoinsRequest>,
  ): Promise<AccountCoinsResponse> {
    throw new Error('Method not implemented.');
  }

  private async doRequest<T>(endpoint: string): Promise<T> {
    // Just bubble up any errors for now
    const response = await fetch(`${this.baseEndpoint}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Explorer API request failed: ${await response.text()}`);
    }

    return JSONBI.parse(await response.text());
  }

  private get ergCurrency(): Currency {
    return { symbol: 'ERG', decimals: ERG_DECIMAL_PLACES };
  }

  private get blockId(): { blockIdentifier: BlockIdentifier } {
    return { blockIdentifier: { index: 0, hash: '' } };
  }

  private getBaseEndpoint(network: string): string {
    switch (network) {
      case 'mainnet':
        return 'https://api.ergoplatform.com';
      case 'testnet':
        return 'https://api-testnet.ergoplatform.com';
      default:
        throw new Error(`Unsupported explorer API network: ${network}`);
    }
  }
}
