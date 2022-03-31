import { AppShell } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthenticatedWallet } from '@/hooks';

import { Header } from './Header/Header';
import { Navbar } from './Navbar/Navbar';

export function Layout() {
  const { wallet, clearWallet } = useAuthenticatedWallet();
  const navigate = useNavigate();

  const onLogout = () => {
    clearWallet();

    navigate('/wallets');
  };

  return (
    <>
      <AppShell
        header={<Header onLogout={onLogout} loggedIn={!!wallet} />}
        navbar={!!wallet ? <Navbar /> : undefined}
      >
        <main>
          <Outlet />
        </main>
      </AppShell>
    </>
  );
}
