import { getBackendService } from './services';

export interface AppState {
  initialSetupComplete: boolean;
  firstWalletCreated: boolean;
}

const DATA_DESCRIPTOR = 'wallet-x-app-state';

export const defaultAppState = (): AppState => ({
  initialSetupComplete: false,
  firstWalletCreated: false,
});

export const saveAppState = async (state: AppState): Promise<AppState> => {
  const backend = getBackendService();

  return backend.storeData(DATA_DESCRIPTOR, state);
};

export const getAppState = async (): Promise<AppState> => {
  const backend = getBackendService();
  const appState = await backend.getStoredData<AppState>(DATA_DESCRIPTOR);

  if (!appState) {
    throw new Error('AppState not found, must be initialized first');
  }

  return appState;
};

export const isStateInitialized = async (): Promise<boolean> => {
  try {
    await getAppState();
    return true;
  } catch {
    return false;
  }
};