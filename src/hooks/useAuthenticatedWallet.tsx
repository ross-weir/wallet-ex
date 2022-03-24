import React from 'react';

import { Wallet } from '../entities';

interface IAuthenticatedWalletContext {
  wallet?: Wallet;
  setAuthenticatedWallet: React.Dispatch<
    React.SetStateAction<Wallet | undefined>
  >;
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
  const [wallet, setAuthenticatedWallet] = React.useState<Wallet | undefined>(
    undefined,
  );

  return (
    <AuthenticatedWalletContext.Provider
      value={{ wallet, setAuthenticatedWallet }}
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
