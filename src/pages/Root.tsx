import { Outlet } from 'react-router-dom';

import AppBarTop from '@/components/AppBarTop';
import {
  AccountsProvider,
  AuthenticatedWalletProvider,
  SensitiveModeProvider,
  WalletExProvider,
} from '@/hooks';

export function Root() {
  return (
    <SensitiveModeProvider>
      <WalletExProvider>
        <AuthenticatedWalletProvider>
          <AccountsProvider>
            <div style={{ height: '100vh' }}>
              <AppBarTop />
              <Outlet />
            </div>
          </AccountsProvider>
        </AuthenticatedWalletProvider>
      </WalletExProvider>
    </SensitiveModeProvider>
  );
}
