import React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import InitWalletView from './components/InitWalletView';
import WalletActionForm from './components/InitWalletView/WalletActionForm';
import { initErgo } from './ergo';
import { SensitiveModeProvider } from './hooks';
import {
  WalletsList,
  AddWallet,
  WalletView,
  Initializing,
  ModeSelection,
  FirstUse,
  Root,
} from './routes';
import { Test } from './routes/Test';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initErgo().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      <SensitiveModeProvider>
        <React.StrictMode>
          <Suspense fallback="loading">
            <Routes>
              <Route path="/" element={<Root />}>
                <Route index element={<Navigate to="/test" />} />

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
            </Routes>
          </Suspense>
        </React.StrictMode>
      </SensitiveModeProvider>
    </BrowserRouter>
  );
}

export default App;
