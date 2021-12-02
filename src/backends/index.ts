import { Backend } from './backend';
import { TauriBackend } from './tauriBackend';

let _backend: Backend;

export const getBackend = (): Backend => {
  if (!_backend) {
    _backend = new TauriBackend();
  }

  return _backend;
};
