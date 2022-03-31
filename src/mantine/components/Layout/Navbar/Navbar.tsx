import { Box, Navbar as MantineNavbar } from '@mantine/core';

import { useAuthenticatedWallet } from '@/hooks';
import { Wallet } from '@/internal';

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
  const { wallet } = useAuthenticatedWallet();

  return (
    <MantineNavbar width={{ base: 300 }} p="xs">
      <MantineNavbar.Section mt="sm">
        <WalletOverview wallet={wallet!} />
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mt="xs">
        <p>test</p>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <p>test2</p>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
