import { BackendService } from '../services';
import { TauriBackend } from '../services/backend/tauriBackend';
import { Token, Container } from 'typedi';

export const BackendServiceToken = new Token<BackendService>('BackendService');

export function setupContainer() {
  Container.set(BackendServiceToken, new TauriBackend());
}
