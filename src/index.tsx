import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

import { initI18n } from './i18n';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { WalletView } from './routes';
import WalletsList from './routes/WalletsList';

initI18n();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/wallets" element={<WalletsList />} />
          <Route
            path="wallets/:walletId/accounts/:accountId"
            element={<WalletView />}
          />
          <Route path="*" element={<p>How did you get hur?</p>} />
        </Routes>
      </Suspense>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
