import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactRoutes,
} from 'react-router-dom';

import { WalletList } from '@/mantine/components/WalletList/WalletList';

import { Layout } from './mantine/components/Layout';
import { Test } from './pages/Test';

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/wallets" />} />

          <Route path="wallets" element={<WalletList />} />

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
