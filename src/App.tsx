import React from 'react';
import { Suspense, useEffect, useState } from 'react';

import { initErgo } from './ergo';
import { Routes } from './Routes';

function App() {
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
        <Routes />
      </Suspense>
    </React.StrictMode>
  );
}

export default App;
