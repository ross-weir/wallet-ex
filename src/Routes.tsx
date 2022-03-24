import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactRoutes,
} from 'react-router-dom';
import InitWalletView from './components/InitWalletView';
import WalletActionForm from './components/InitWalletView/WalletActionForm';
import {
  Root,
  ModeSelection,
  Initializing,
  FirstUse,
  WalletsList,
  AddWallet,
  WalletView,
} from './pages';
import { Test } from './pages/Test';

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Root />}>
          <Route index element={<Navigate to="/modeSelect" />} />

          <Route path="modeSelect" element={<ModeSelection />} />
          <Route path="initializing" element={<Initializing />} />
          <Route path="firstUse" element={<FirstUse />} />

          <Route path="wallets" element={<WalletsList />} />
          <Route path="wallets/add" element={<AddWallet />}>
            <Route index element={<InitWalletView />} />
            <Route path=":action" element={<WalletActionForm />} />
          </Route>
          <Route path="wallets/:walletId" element={<WalletView />} />

          <Route path="test" element={<Test />} />

          <Route path="*" element={<p>How did you get hur?</p>} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
}
