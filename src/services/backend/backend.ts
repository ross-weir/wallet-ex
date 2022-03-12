import { HashedPassword } from '../../crypto';
import { WalletInterfaceType } from '../walletInterface';

export interface CreateWalletArgs {
  name: string;
  password: HashedPassword;
  interface: WalletInterfaceType;
  hdStandard: string;
}

export interface CreateAccountArgs {
  name: string;
  coinType: number;
  walletId: number;
}

export interface CreateAddressArgs {
  address: string;
  deriveIdx: number;
  accountId: number;
  balance?: number;
}

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
  abstract createWallet(args: CreateWalletArgs): BackendOpResult<any>;
  abstract findWallet(id: number): BackendOpResult<any>;
  // return type should also include pagination data
  abstract listWallets(/** pagination */): BackendOpResult<any[]>;

  abstract createAccount(args: CreateAccountArgs): BackendOpResult<any>;
  abstract findAccount(id: number): BackendOpResult<any>;
  abstract accountsForWallet(
    walletId: number /**, pagination */,
  ): BackendOpResult<any[]>;

  abstract createAddress(args: CreateAddressArgs): BackendOpResult<any>;
  // would prefer this to be a filter on `listAddresses` but not sure how to do dynamic queries yet
  abstract addressesForAccount(
    accountId: number /**, pagination */,
  ): BackendOpResult<any[]>;

  abstract readConfig(): Promise<string>;
  abstract writeConfig(cfg: string): Promise<void>;

  // Not required when the Wallet interface is the type of a HW wallet
  abstract storeSecretSeed(args: StoreSecretSeedArgs): BackendOpResult<void>;
  abstract getSecretSeed(args: GetSecretSeedArgs): BackendOpResult<Uint8Array>;

  /**
   * Check credentials used to access a wallet
   *
   * @param walletId the wallet to authenticate against
   * @param args args required to check credentials, for tauri this will be a password
   * but for mobile devices, maybe biometrics or something else? Not sure
   */
  abstract checkCredentialsForWallet(
    walletId: number,
    args: Record<string, any>,
  ): BackendOpResult<boolean>;

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
