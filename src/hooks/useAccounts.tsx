import React from 'react';
import Container from 'typedi';

import { Account, AccountService } from '@/internal';

import { useAuthenticatedWallet } from './useAuthenticatedWallet';

interface IAccountsContext {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  selectedAccount: Account | undefined;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account | undefined>>;
  loadingAccounts: boolean;
}

const AccountsContext = React.createContext<IAccountsContext | undefined>(
  undefined,
);

interface AccountsProviderProps {
  children: React.ReactNode;
}

function AccountsProvider({ children }: AccountsProviderProps) {
  const accountService = Container.get(AccountService);
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = React.useState<
    Account | undefined
  >();
  const [loadingAccounts, setLoadingAccounts] = React.useState(false);
  const { wallet } = useAuthenticatedWallet();

  React.useEffect(() => {
    if (!wallet) {
      // We logged out of wallet
      if (accounts.length) {
        setAccounts([]);
      }

      return;
    }

    setLoadingAccounts(true);
    accountService
      .filterByWalletId(wallet.id)
      .then((accounts) => {
        setAccounts(accounts);

        if (!!accounts.length) {
          setSelectedAccount(accounts[0]);
        }
      })
      .finally(() => setLoadingAccounts(false));
  }, [wallet, accountService, accounts.length]);

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        setAccounts,
        selectedAccount,
        setSelectedAccount,
        loadingAccounts,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

function useAccounts() {
  const ctx = React.useContext(AccountsContext);

  if (!ctx) {
    throw new Error('useAccounts must be within AccountsProvider');
  }

  return ctx;
}

export { AccountsProvider, useAccounts };
