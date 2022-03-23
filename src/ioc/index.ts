import { BackendService } from '../services';
import { BlockchainClient } from '../blockchains';
import { ErgoExplorerClient } from '../blockchains/ergo/ergoExplorerClient/ergoExplorerClient'; // todo
import { TauriBackend } from '../services/backend/tauriBackend';
import { Token, Container } from 'typedi';

export const BackendServiceToken = new Token<BackendService>('BackendService');
export const BlockchainClientToken = new Token<BlockchainClient>(
  'BlockchainClient',
);

export function setupContainer() {
  Container.set(BackendServiceToken, new TauriBackend());
  Container.set(BlockchainClientToken, new ErgoExplorerClient('testnet')); // todo: get this from config
}
