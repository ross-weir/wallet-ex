// Interface to a blockchain
// Used to query data, etc
// For example: explorer vs node etc

export abstract class BlockchainClient {
  /**
   * Get the CONFIRMED balance of an address.
   *
   * Returns the nano ergs balance (todo: + tokens) or throws an expception if there was a problem
   * with the request, this could include network issues or bad client requests, etc.
   *
   * Note: token balances not supported yet.
   *
   * @param address the address to update the balance for base58 with network address encoding.
   */
  abstract balanceForAddress(address: string): Promise<number>;

  abstract submitTx(): void;
}
