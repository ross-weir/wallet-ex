import { path } from '@tauri-apps/api';
import { Container } from 'typedi';
import { BackendServiceToken } from '../ioc';
import { Sidecar } from './sidecar';

const sidecarDir = async (): Promise<string> => {
  const backend = Container.get(BackendServiceToken);

  return backend.appDir();
};

const getFileExt = async (): Promise<string> => {
  const backend = Container.get(BackendServiceToken);
  let platform = await backend.getPlatform();

  return platform === 'windows' ? '.exe' : '';
};

const nodePath = async (): Promise<string> => {
  const dir = await sidecarDir();
  const fileExt = await getFileExt();

  return `${dir}${path.sep}ergo${fileExt}`;
};

export const downloadSidecars = async (): Promise<void[]> => {
  const backend = Container.get(BackendServiceToken);
  let platform = await backend.getPlatform();
  const fileExt = await getFileExt();
  const nodeExe = await nodePath();

  return Promise.all([
    // pass version as arg
    backend.downloadFile(
      `https://github.com/ross-weir/ergo-portable/releases/download/v4.0.23/ergo-${platform}-v4.0.23${fileExt}`,
      nodeExe,
    ),
    // download indexer
  ]);
};

export const startIndexerSidecar = async (): Promise<Sidecar | void> => {
  // pass the node port as env var, set all the env vars
};
