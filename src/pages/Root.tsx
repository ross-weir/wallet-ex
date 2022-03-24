import { Outlet } from 'react-router-dom';
import AppBarTop from '@/components/AppBarTop';
import { AuthenticatedWalletProvider, SensitiveModeProvider } from '@/hooks';

export function Root() {
  return (
    <SensitiveModeProvider>
      <AuthenticatedWalletProvider>
        <AppBarTop />
        <Outlet />
      </AuthenticatedWalletProvider>
    </SensitiveModeProvider>
  );
}
