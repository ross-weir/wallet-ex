import { Box, Navbar as MantineNavbar, ScrollArea } from '@mantine/core';

import { useAuthenticatedWallet, useEntities } from '@/hooks';
import { Account, AccountService, Wallet } from '@/internal';
import Container from 'typedi';
import { useEffect, useState } from 'react';
import { AccountSection } from './AccountSection/AccountSection';

export interface WalletOverviewProps {
  wallet: Wallet;
}

function WalletOverview({ wallet }: WalletOverviewProps) {
  return (
    <Box
      sx={(theme) => ({
        paddingBottom: theme.spacing.sm,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      {wallet?.name}
    </Box>
  );
}

export function Navbar() {
  const { wallet, seed } = useAuthenticatedWallet();
  const { accounts, setAccounts } = useEntities();
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();

  const accountService = Container.get(AccountService);

  useEffect(() => {}, [accounts]);

  const handleAccountCreate = async ({
    name,
    blockchainName,
    network,
  }: any) => {
    const deriveIdx = accountService.getNextDeriveIndex(
      accounts,
      blockchainName,
      network,
    );
    const account = await accountService.create(
      { wallet: wallet!, seed: seed! },
      {
        deriveIdx,
        name,
        network,
        blockchainName,
      },
    );

    // fetch useLocalInfra from config
    account.initBlockchain({ useLocalInfra: false });
    setAccounts((accounts) => [...accounts, account]);
    setSelectedAccount(account);
  };

  return (
    <MantineNavbar width={{ base: 300 }} p="xs">
      <MantineNavbar.Section mt="sm">
        <WalletOverview wallet={wallet!} />
      </MantineNavbar.Section>
      <MantineNavbar.Section grow component={ScrollArea} mt="xs">
        <AccountSection accounts={accounts} />
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <p>test2</p>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
