import { Outlet } from 'react-router-dom';
import AppBarTop from '@/components/AppBarTop';
import {
  AuthenticatedWalletProvider,
  SensitiveModeProvider,
  WalletExProvider,
} from '@/hooks';

export function Root() {
  return (
    <SensitiveModeProvider>
      <WalletExProvider>
        <AuthenticatedWalletProvider>
          <AppBarTop />
          <Outlet />
        </AuthenticatedWalletProvider>
      </WalletExProvider>
    </SensitiveModeProvider>
  );
}
