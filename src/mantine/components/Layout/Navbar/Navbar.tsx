import { Box, Navbar as MantineNavbar } from '@mantine/core';
import Container from 'typedi';

import { useAccounts, useAuthenticatedWallet } from '@/hooks';
import { AccountService, Wallet } from '@/internal';

import { AccountSection, CreateAccountProcessedSchema } from './AccountSection';

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
  const { accounts, setAccounts, setSelectedAccount } = useAccounts();
  const accountService = Container.get(AccountService);

  const onAccountCreate = async (form: CreateAccountProcessedSchema) => {
    const { blockchainName, network, name } = form;

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
      <MantineNavbar.Section grow mt="xs">
        <AccountSection accounts={accounts} onAccountCreate={onAccountCreate} />
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <p>infrastructure</p>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
