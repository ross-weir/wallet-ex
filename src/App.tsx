import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import React, { Suspense, useEffect, useState } from 'react';

import { initErgo } from './ergo';
import {
  AccountsProvider,
  AuthenticatedWalletProvider,
  WalletExProvider,
} from './hooks';
import { Routes } from './Routes';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initErgo().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <React.StrictMode>
      <Suspense fallback="loading">
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withNormalizeCSS
            withGlobalStyles
          >
            <WalletExProvider>
              <AuthenticatedWalletProvider>
                <AccountsProvider>
                  <ModalsProvider>
                    <Routes />
                  </ModalsProvider>
                </AccountsProvider>
              </AuthenticatedWalletProvider>
            </WalletExProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Suspense>
    </React.StrictMode>
  );
}

export default App;
