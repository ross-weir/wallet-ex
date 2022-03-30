import { fs, invoke, os, path } from '@tauri-apps/api';
import localforage from 'localforage';

import { AesCrypto, EncryptResult } from '@/crypto';

import {
  BackendOpResult,
  BackendService,
  GetSecretSeedArgs,
  StoreSecretSeedArgs,
} from './backend';

// TODO: dynamically import tauri
export class TauriBackend extends BackendService {
  private readonly aes = AesCrypto.default();

  getFilename(fullPath: string): Promise<string> {
    return path.basename(fullPath);
  }

  removeFile(file: string): Promise<void> {
    return fs.removeFile(file);
  }

  mkDir(dirPath: string): Promise<void> {
    return fs.createDir(dirPath);
  }

  pathExists(path: string): Promise<boolean> {
    return invoke('path_exists', { path });
  }

  digestFile(filePath: string): Promise<string> {
    return invoke('digest_file', { filePath });
  }

  readFile(filePath: string): Promise<string> {
    return fs.readTextFile(filePath);
  }

  writeFile(filePath: string, contents: string): Promise<void> {
    return fs.writeFile({ contents, path: filePath });
  }

  async readConfig(): BackendOpResult<string> {
    return fs.readTextFile(await this.cfgPath());
  }

  async writeConfig(cfg: string): BackendOpResult<void> {
    const file = { contents: cfg, path: await this.cfgPath() };
    return fs.writeFile(file);
  }

  async storeSecretSeed({
    storageKey,
    password,
    seed,
  }: StoreSecretSeedArgs): BackendOpResult<void> {
    const encryptedSeedResult = await this.aes.encrypt({
      password,
      data: seed,
    });

    localforage.setItem(storageKey, encryptedSeedResult);
  }

  async getSecretSeed({
    storageKey,
    password,
  }: GetSecretSeedArgs): BackendOpResult<Uint8Array> {
    const decryptParams = await localforage.getItem<EncryptResult>(storageKey);

    if (!decryptParams) {
      throw new Error('backend: failed to find encrypted seed data for wallet');
    }

    return await this.aes.decrypt({
      password,
      data: decryptParams.cipherText,
      iv: decryptParams.iv,
      salt: decryptParams.salt,
    });
  }

  async storeData<T>(descriptor: string, data: T): BackendOpResult<T> {
    return localforage.setItem(descriptor, data);
  }

  async getStoredData<T>(
    descriptor: string,
  ): BackendOpResult<T | undefined | null> {
    return localforage.getItem(descriptor);
  }

  async downloadFile(url: string, outPath: string): BackendOpResult<void> {
    return invoke('download_file', { url, outPath });
  }

  async appDir(): BackendOpResult<string> {
    return path.appDir();
  }

  async getPlatform(): BackendOpResult<string> {
    // navigator.userAgentData.platform; could be used in future
    // not currently supported in firefox, not sure if that matters though
    return os.platform();
  }

  getFreePort(): BackendOpResult<number> {
    return invoke('get_free_port');
  }

  private async cfgPath() {
    const appDir = await path.appDir();
    return `${appDir}${path.sep}.wallet-ex.json`;
  }
}
