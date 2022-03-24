import React from 'react';

import {
  AppConfig,
  AppState,
  getAppConfig,
  getAppState,
  ObjectStorage,
} from '../storage';

interface IWalletExContext {
  stateStore: ObjectStorage<AppState>;
  configStore: ObjectStorage<AppConfig>;
}

const WalletExContext = React.createContext<IWalletExContext>({
  stateStore: getAppState(),
  configStore: getAppConfig(),
});

interface WalletExProviderProps {
  children: React.ReactNode;
}

function WalletExProvider({ children }: WalletExProviderProps) {
  return (
    <WalletExContext.Provider
      value={{ stateStore: getAppState(), configStore: getAppConfig() }}
    >
      {children}
    </WalletExContext.Provider>
  );
}

function useWalletEx() {
  const ctx = React.useContext(WalletExContext);

  if (!ctx) {
    throw new Error('useWalletEx must be within WalletExProvider');
  }

  return ctx;
}

export { useWalletEx,WalletExProvider };
