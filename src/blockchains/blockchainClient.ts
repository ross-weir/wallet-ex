import {
  AccountApi,
  AccountBalanceRequest,
  AccountBalanceResponse,
  AccountCoinsRequest,
  AccountCoinsResponse,
  createConfiguration,
  NetworkApi,
  NetworkIdentifier,
  NetworkRequest,
  NetworkStatusResponse,
  ServerConfiguration,
} from '@wallet-ex/rosetta-api-client';

// Required network parameters are passed in constructor,
// no need to have them in every request.
export type OmitNetwork<T> = Omit<T, 'networkIdentifier'>;

/**
 * This interface follows the coinbase rosetta interface.
 * See: https://www.rosetta-api.org/
 * Wallet Ex is built against this interface for blockchain clients so it
 * can easily use rosetta implementations but also be implemented for other APIs (like ergo explorer)
 * via type conversion if the blockchain doesn't have a rosetta implementation.
 */
export interface BlockchainClient {
  networkStatus(
    networkRequest?: OmitNetwork<NetworkRequest>,
  ): Promise<NetworkStatusResponse>;

  accountBalance(
    accountBalanceRequest: OmitNetwork<AccountBalanceRequest>,
  ): Promise<AccountBalanceResponse>;
  accountCoins(
    accountCoinsRequest: OmitNetwork<AccountCoinsRequest>,
  ): Promise<AccountCoinsResponse>;
}

export class RosettaBlockchainClient implements BlockchainClient {
  private readonly network: NetworkApi;
  private readonly account: AccountApi;

  constructor(
    private readonly endpoint: string,
    private readonly blockchain: string,
    private readonly networkStr: string,
  ) {
    const conf = createConfiguration({
      baseServer: new ServerConfiguration(this.endpoint, {}),
    });

    this.network = new NetworkApi(conf);
    this.account = new AccountApi(conf);
  }

  async networkStatus(
    networkRequest?: OmitNetwork<NetworkRequest>,
  ): Promise<NetworkStatusResponse> {
    return this.network.networkStatus({
      networkIdentifier: this.networkId,
      ...networkRequest,
    });
  }

  async accountBalance(
    accountBalanceRequest: OmitNetwork<AccountBalanceRequest>,
  ): Promise<AccountBalanceResponse> {
    return this.account.accountBalance({
      networkIdentifier: this.networkId,
      ...accountBalanceRequest,
    });
  }

  async accountCoins(
    accountCoinsRequest: OmitNetwork<AccountCoinsRequest>,
  ): Promise<AccountCoinsResponse> {
    return this.account.accountCoins({
      networkIdentifier: this.networkId,
      ...accountCoinsRequest,
    });
  }

  private get networkId(): NetworkIdentifier {
    return { blockchain: this.blockchain, network: this.networkStr };
  }
}
