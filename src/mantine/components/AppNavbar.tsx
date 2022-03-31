import { useAuthenticatedWallet } from '@/hooks';
import { Wallet } from '@/internal';
import { Box, Divider, Navbar, useMantineTheme } from '@mantine/core';

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

export function AppNavbar() {
  const { wallet } = useAuthenticatedWallet();

  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section mt="sm">
        <WalletOverview wallet={wallet!} />
      </Navbar.Section>
      <Navbar.Section grow mt="xs">
        <p>test</p>
      </Navbar.Section>
      <Navbar.Section>
        <p>test2</p>
      </Navbar.Section>
    </Navbar>
  );
}
