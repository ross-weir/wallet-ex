import React from 'react';

import { Wallet, WalletContext } from '@/internal';

interface IAuthenticatedWalletContext {
  wallet?: Wallet;
  seed?: Uint8Array;
  setAuthenticatedWallet: (state: WalletContext) => void;
  clearWallet: () => void;
}

const AuthenticatedWalletContext = React.createContext<
  IAuthenticatedWalletContext | undefined
>(undefined);

interface AuthenticatedWalletProviderProps {
  children: React.ReactNode;
}

function AuthenticatedWalletProvider({
  children,
}: AuthenticatedWalletProviderProps) {
  const [wallet, setWallet] = React.useState<Wallet | undefined>(undefined);
  const [seed, setSeed] = React.useState<Uint8Array | undefined>(undefined);

  const clearWallet = () => {
    setWallet(undefined);
    setSeed(undefined);
  };

  const setAuthenticatedWallet = ({ wallet, seed }: WalletContext) => {
    setWallet(wallet);
    setSeed(seed);
  };

  return (
    <AuthenticatedWalletContext.Provider
      value={{ wallet, seed, setAuthenticatedWallet, clearWallet }}
    >
      {children}
    </AuthenticatedWalletContext.Provider>
  );
}

function useAuthenticatedWallet() {
  const ctx = React.useContext(AuthenticatedWalletContext);

  if (!ctx) {
    throw new Error(
      'useAuthenticatedWallet must be within AuthenticatedWalletProvider',
    );
  }

  return ctx;
}

export { AuthenticatedWalletProvider, useAuthenticatedWallet };
