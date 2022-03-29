import { Outlet } from 'react-router-dom';

import AppBarTop from '@/components/AppBarTop';
import {
  AuthenticatedWalletProvider,
  EntitiesProvider,
  SensitiveModeProvider,
  WalletExProvider,
} from '@/hooks';

export function Root() {
  return (
    <SensitiveModeProvider>
      <WalletExProvider>
        <AuthenticatedWalletProvider>
          <EntitiesProvider>
            <div style={{ height: '100vh' }}>
              <AppBarTop />
              <Outlet />
            </div>
          </EntitiesProvider>
        </AuthenticatedWalletProvider>
      </WalletExProvider>
    </SensitiveModeProvider>
  );
}
