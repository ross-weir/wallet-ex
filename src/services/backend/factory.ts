import { container } from 'tsyringe';
import { BackendService } from './backend';
import { TauriBackend } from './tauriBackend';

container.register<BackendService>('BackendService', {
  useValue: new TauriBackend(),
});

let _backend: BackendService;

export const getBackendService = (): BackendService => {
  if (!_backend) {
    _backend = new TauriBackend();
  }

  return _backend;
};
