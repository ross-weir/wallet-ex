import React, { Suspense, useEffect, useState } from 'react';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { Routes } from './Routes';
import {
  WalletExProvider,
  AuthenticatedWalletProvider,
  EntitiesProvider,
} from './hooks';
import { initErgo } from './ergo';

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
                <EntitiesProvider>
                  <Routes />
                </EntitiesProvider>
              </AuthenticatedWalletProvider>
            </WalletExProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Suspense>
    </React.StrictMode>
  );
}

export default App;
