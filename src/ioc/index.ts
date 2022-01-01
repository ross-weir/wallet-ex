import {
  BackendService,
  ChainProvider,
  ExplorerChainProvider,
} from '../services';
import { TauriBackend } from '../services/backend/tauriBackend';
import { Token, Container } from 'typedi';

export const BackendServiceToken = new Token<BackendService>('BackendService');
export const ChainProviderToken = new Token<ChainProvider>('ChainProvider');

export function setupContainer() {
  Container.set(BackendServiceToken, new TauriBackend());
  Container.set(ChainProviderToken, new ExplorerChainProvider(0));
}
