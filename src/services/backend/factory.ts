import { BackendService } from './backend';
import { TauriBackend } from './tauriBackend';

let _backend: BackendService;

export const getBackendService = (): BackendService => {
  if (!_backend) {
    _backend = new TauriBackend();
  }

  return _backend;
};
