import React, { Suspense } from 'react';
import logo from './logo.svg';
import tauriCircles from './tauri.svg';
import tauriWord from './wordmark.svg';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t } = useTranslation('wallet');

  return (
    <Suspense fallback="loading">
      <div className="App">
        <header className="App-header">
          <div className="inline-logo">
            <img src={tauriCircles} className="App-logo rotate" alt="logo" />
            <img src={tauriWord} className="App-logo smaller" alt="logo" />
          </div>
          <a
            className="App-link"
            href="https://tauri.studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Tauri
          </a>
          <img src={logo} className="App-logo rotate" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('error.noWalletName')}
          </a>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
      </div>
    </Suspense>
  );
}

export default App;
