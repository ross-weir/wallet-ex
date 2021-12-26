import { HashedPassword } from '../../crypto';
import { Account, Address, Wallet } from '../../entities';
import { WalletInterfaceType } from '../wallet';

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
}

export interface StoreSecretSeedArgs {
  password: string;
  seed: Uint8Array;
  // used to calculate where to store the key
  wallet: Wallet;
}

export interface GetSecretSeedArgs {
  password: string;
  wallet: Wallet;
}

export type BackendOpResult<T> = Promise<T>;

export interface BackendService {
  createWallet(args: CreateWalletArgs): BackendOpResult<Wallet>;
  findWallet(id: number): BackendOpResult<Wallet>;
  // return type should also include pagination data
  listWallets(/** pagination */): BackendOpResult<Wallet[]>;

  createAccount(args: CreateAccountArgs): BackendOpResult<Account>;
  findAccount(id: number): BackendOpResult<Account>;
  accountsForWallet(
    walletId: number /**, pagination */,
  ): BackendOpResult<Account[]>;

  createAddress(args: CreateAddressArgs): BackendOpResult<Address>;
  // would prefer this to be a filter on `listAddresses` but not sure how to do dynamic queries yet
  addressesForAccount(
    accountId: number /**, pagination */,
  ): BackendOpResult<Address[]>;

  readConfig(): Promise<string>;
  writeConfig(cfg: string): Promise<void>;

  // Not required when the Wallet interface is the type of a HW wallet
  storeSecretSeed(args: StoreSecretSeedArgs): BackendOpResult<void>;
  getSecretSeed(args: GetSecretSeedArgs): BackendOpResult<Uint8Array>;

  /**
   * Check credentials used to access a wallet
   *
   * @param walletId the wallet to authenticate against
   * @param args args required to check credentials, for tauri this will be a password
   * but for mobile devices, maybe biometrics or something else? Not sure
   */
  checkCredentialsForWallet(
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
  storeData<T>(descriptor: string, data: T): BackendOpResult<T>;

  /**
   * Retreive arbitrary data from the store used by the backend
   *
   * @param descriptor key used for storing the data
   */
  getStoredData<T>(descriptor: string): BackendOpResult<T | undefined | null>;
}
