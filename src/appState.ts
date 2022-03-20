import { ObjectStorage } from './storage';

export enum ApplicationState {
  // first use
  None = 'none',
  Initializing = 'initializing',
}

export interface AppState {
  state: ApplicationState;
}

const getDefault = (): AppState => ({
  state: ApplicationState.None,
});

const appState = new ObjectStorage('wallet-ex-state', getDefault());

export const getAppState = () => appState;
