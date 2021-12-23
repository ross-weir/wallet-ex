import { BackendService } from './backend';
import { TauriBackend } from './tauriBackend';

let _backend: BackendService;

export const getBackendService = (): BackendService => {
  // if env == tauri
  // const mod = await import('./tauriBackend.ts')
  // _backend = new mod.TauriBackend();
  if (!_backend) {
    _backend = new TauriBackend();
  }

  return _backend;
};