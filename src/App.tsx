import React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { initErgo } from './ergo';
import { SensitiveModeProvider } from './hooks';
import { WalletsList, AddWallet, WalletView } from './routes';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initErgo().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <p>testoing....</p>
    // <BrowserRouter>
    //   <SensitiveModeProvider>
    //     <React.StrictMode>
    //       <Suspense fallback="loading">
    //         <Routes>
    //           <Route path="/" element={<Navigate to="/wallets" />} />
    //           <Route path="/wallets" element={<WalletsList />} />
    //           <Route path="/wallets/add" element={<AddWallet />} />
    //           <Route path="/wallets/:walletId" element={<WalletView />} />
    //           <Route path="*" element={<p>How did you get hur?</p>} />
    //         </Routes>
    //       </Suspense>
    //     </React.StrictMode>
    //   </SensitiveModeProvider>
    // </BrowserRouter>
  );
}

export default App;
