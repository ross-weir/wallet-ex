import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

import { initI18n } from './i18n';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { AddWallet, WalletView } from './routes';
import WalletsList from './routes/WalletsList';
import { SensitiveModeProvider } from './hooks';

initI18n();

ReactDOM.render(
  <BrowserRouter>
    <SensitiveModeProvider>
      <React.StrictMode>
        <Suspense fallback="loading">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/wallets" element={<WalletsList />} />
            <Route path="/wallets/add" element={<AddWallet />} />
            <Route path="/wallets/:walletId" element={<WalletView />} />
            <Route path="*" element={<p>How did you get hur?</p>} />
          </Routes>
        </Suspense>
      </React.StrictMode>
    </SensitiveModeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
