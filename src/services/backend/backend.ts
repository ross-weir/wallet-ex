export interface StoreSecretSeedArgs {
  password: string;
  seed: Uint8Array;
  storageKey: string;
}

export interface GetSecretSeedArgs {
  password: string;
  storageKey: string;
}

export type BackendOpResult<T> = Promise<T>;

export abstract class BackendService {
  abstract readConfig(): Promise<string>;
  abstract writeConfig(cfg: string): Promise<void>;

  abstract readFile(filePath: string): Promise<string>;
  abstract writeFile(filePath: string, contents: string): Promise<void>;

  abstract mkDir(dirPath: string): Promise<void>;
  abstract removeFile(file: string): Promise<void>;
  abstract pathExists(path: string): Promise<boolean>;
  abstract getFilename(fullPath: string): Promise<string>;

  abstract digestFile(filePath: string): Promise<string>;

  // Not required when the Wallet interface is the type of a HW wallet
  abstract storeSecretSeed(args: StoreSecretSeedArgs): BackendOpResult<void>;
  abstract getSecretSeed(args: GetSecretSeedArgs): BackendOpResult<Uint8Array>;

  /**
   * Store arbitrary data using the method of the backends choosing
   * For example using tauri this could be indexdb, websql or localstorage
   *
   * @param descriptor key used for storing the data
   * @param data the data to store
   * @returns the stored data or err
   */
  abstract storeData<T>(descriptor: string, data: T): BackendOpResult<T>;

  /**
   * Retreive arbitrary data from the store used by the backend
   *
   * @param descriptor key used for storing the data
   */
  abstract getStoredData<T>(
    descriptor: string,
  ): BackendOpResult<T | undefined | null>;

  /**
   * Downloads a file from the provided url and saves it
   * to the path provided outPath.
   *
   * NOTE: This function is required because there's some issues using tauris http
   * module to download the file, its very slow and causes the UI to block while downloading.
   *
   * @param url location of the file to download
   * @param outPath path to save the file
   */
  abstract downloadFile(url: string, outPath: string): BackendOpResult<void>;

  /**
   * Returns a path to the application directory.
   *
   * Used to download sidecar binaries, etc.
   */
  abstract appDir(): BackendOpResult<string>;

  /**
   * Get the operating system the application is running on.
   */
  abstract getPlatform(): BackendOpResult<string>;

  /**
   * Get a free port on the system.
   *
   * WARNING: There can be race conditions here, the port can get sniped
   * between when we get the free port and actually try to use it.
   */
  abstract getFreePort(): BackendOpResult<number>;
}
