export interface ExplorerToken {
  tokenId: string;
  amount: number;
  decimals: number;
  name: string;
  tokenType: string;
}

export interface ExplorerBalanceConfirmedResponse {
  nanoErgs: number;
  tokens: ExplorerToken[];
}
