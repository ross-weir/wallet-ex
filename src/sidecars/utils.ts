import { path } from '@tauri-apps/api';
import { Container } from 'typedi';
import { BackendServiceToken } from '../ioc';
import { Sidecar } from './sidecar';

const sidecarDir = async (): Promise<string> => {
  const backend = Container.get(BackendServiceToken);

  return backend.appDir();
};

export const downloadSidecars = async (): Promise<void[]> => {
  const dir = await sidecarDir();
  const backend = Container.get(BackendServiceToken);
  let platform = await backend.getPlatform();
  let fileExt = '';

  if (platform === 'win32') {
    platform = 'windows';
    fileExt = '.exe';
  }

  return Promise.all([
    // pass version as arg
    backend.downloadFile(
      `https://github.com/ross-weir/ergo-portable/releases/download/v4.0.23/ergo-${platform}-v4.0.23${fileExt}`,
      `${dir}${path.sep}ergo`,
    ),
    // download indexer
  ]);
};

export interface ErgoSidecarArgs {
  port?: number;
  apiKey?: string;
  network: 'testnet' | 'mainnet';
}

export const startErgoSidecar = async (): Promise<Sidecar | void> => {
  // write to config file, rest api port, etc
  // generate a apikey hash
  // start sidecar
};

export const startIndexerSidecar = async (): Promise<Sidecar | void> => {
  // pass the node port as env var, set all the env vars
};
