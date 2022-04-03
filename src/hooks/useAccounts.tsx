import React from 'react';
import Container from 'typedi';

import { Account, AccountService } from '@/internal';

import { useAuthenticatedWallet } from './useAuthenticatedWallet';

interface IAccountsContext {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  selectedAccount: Account | undefined;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account | undefined>>;
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
  }, [wallet, accountService, accounts.length]);

  return (
    <AccountsContext.Provider
      value={{ accounts, setAccounts, selectedAccount, setSelectedAccount }}
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
