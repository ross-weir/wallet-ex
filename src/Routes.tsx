import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactRoutes,
} from 'react-router-dom';

import { WalletListPage } from '@/mantine/components/WalletListPage/WalletListPage';

import { AccountPage } from './mantine/components/AccountPage';
import { Layout } from './mantine/components/Layout';
import { Test } from './pages/Test';

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/wallets" />} />

          <Route path="wallets" element={<WalletListPage />} />

          {/* Wallet overview page */}
          <Route path="wallets/:walletId" element={<p>wallet overview</p>} />

          <Route
            path="wallets/:walletId/accounts/:accountId"
            element={<AccountPage />}
          />

          <Route path="*" element={<p>How did you get hur?</p>} />
        </Route>
        {/* <Route path="/" element={<Root />}>
          <Route index element={<Navigate to="/wallets" />} />

          <Route path="modeSelect" element={<ModeSelection />} />
          <Route path="firstUse" element={<FirstUse />} />

          <Route path="wallets/:walletId" element={<WalletView />} />

          <Route path="test" element={<Test />} />

        </Route> */}
      </ReactRoutes>
    </BrowserRouter>
  );
}
