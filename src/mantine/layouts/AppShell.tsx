import { ActionIcon, AppShell, Navbar, Group } from '@mantine/core';

import { AppHeader, AppNavbar } from '@@/components';
import { useAuthenticatedWallet } from '@/hooks';
import { Outlet } from 'react-router-dom';

export function WalletExApp() {
  const { wallet, clearWallet } = useAuthenticatedWallet();

  return (
    <>
      <AppShell
        header={<AppHeader />}
        navbar={!!wallet ? <AppNavbar /> : undefined}
        // navbar={<AppNavbar />}
      >
        <Outlet />
      </AppShell>
    </>
  );
}
