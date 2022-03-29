import React from 'react';
import Container from 'typedi';

import { Account, AccountService } from '@/internal';

import { useAuthenticatedWallet } from './useAuthenticatedWallet';

interface IEntitiesContext {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}

const EntitiesContext = React.createContext<IEntitiesContext | undefined>(
  undefined,
);

interface EntitiesProviderProps {
  children: React.ReactNode;
}

function EntitiesProvider({ children }: EntitiesProviderProps) {
  const accountService = Container.get(AccountService);
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const { wallet } = useAuthenticatedWallet();

  React.useEffect(() => {
    if (!wallet) {
      return;
    }

    accountService.filterByWalletId(wallet.id).then(setAccounts);
  }, [wallet, accountService]);

  return (
    <EntitiesContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </EntitiesContext.Provider>
  );
}

function useEntities() {
  const ctx = React.useContext(EntitiesContext);

  if (!ctx) {
    throw new Error('useEntities must be within EntitiesProvider');
  }

  return ctx;
}

export { EntitiesProvider, useEntities };
