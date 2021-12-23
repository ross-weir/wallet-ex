import React from 'react';
import { getBackend } from '../backends';

const backend = getBackend();
const BackendContext = React.createContext(backend);

interface BackendProviderProps {
  children: React.ReactNode;
}

function BackendProvider({ children }: BackendProviderProps) {
  return (
    <BackendContext.Provider value={backend}>
      {children}
    </BackendContext.Provider>
  );
}

function useBackend() {
  const ctx = React.useContext(BackendContext);

  if (!ctx) {
    throw new Error('useBackend must be within BackendProvider');
  }

  return ctx;
}

export { BackendProvider, useBackend };
