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
          <div style={{ height: '100vh' }}>
            <AppBarTop />
            <Outlet />
          </div>
        </AuthenticatedWalletProvider>
      </WalletExProvider>
    </SensitiveModeProvider>
  );
}
