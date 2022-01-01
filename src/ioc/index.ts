import { container } from 'tsyringe';
import { BackendService } from '../services';
import { TauriBackend } from '../services/backend/tauriBackend';

export function setupContainer() {
  container.register<BackendService>('BackendService', {
    useValue: new TauriBackend(),
  });
}
