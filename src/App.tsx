import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation('wallet');

  return (
    <Suspense fallback="loading">
      <div className="App">
        <p>Hello world</p>
      </div>
    </Suspense>
  );
}

export default App;
