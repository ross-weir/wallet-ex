import React from 'react';
import Container from 'typedi';

import { Account, AccountService } from '@/internal';

import { useAuthenticatedWallet } from './useAuthenticatedWallet';

interface IEntitiesContext {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  selectedAccount: Account | undefined;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account | undefined>>;
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
  const [selectedAccount, setSelectedAccount] = React.useState<
    Account | undefined
  >();
  const { wallet } = useAuthenticatedWallet();

  React.useEffect(() => {
    if (!wallet) {
      // We logged out of wallet
      if (accounts.length) {
        setAccounts([]);
      }

      return;
    }

    accountService.filterByWalletId(wallet.id).then((accounts) => {
      setAccounts(accounts);

      if (!!accounts.length) {
        setSelectedAccount(accounts[0]);
      }
    });
  }, [wallet, accountService]);

  return (
    <EntitiesContext.Provider
      value={{ accounts, setAccounts, selectedAccount, setSelectedAccount }}
    >
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
