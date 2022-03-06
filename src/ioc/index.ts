import { BackendService, BlockchainClient, ExplorerClient } from '../services';
import { TauriBackend } from '../services/backend/tauriBackend';
import { Token, Container } from 'typedi';

export const BackendServiceToken = new Token<BackendService>('BackendService');
export const BlockchainClientToken = new Token<BlockchainClient>(
  'BlockchainClient',
);

export function setupContainer() {
  Container.set(BackendServiceToken, new TauriBackend());
  Container.set(BlockchainClientToken, new ExplorerClient(0));
}
