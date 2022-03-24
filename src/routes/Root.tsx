import { Outlet } from 'react-router-dom';
import AppBarTop from '../components/AppBarTop';
import { AuthenticatedWalletProvider } from '../hooks';

export function Root() {
  return (
    <AuthenticatedWalletProvider>
      <AppBarTop />
      <Outlet />
    </AuthenticatedWalletProvider>
  );
}
