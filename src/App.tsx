import WalletActionView from './components/WalletActionView';
import { BackendProvider } from './hooks';

import { Button, Menu, Segment } from 'semantic-ui-react';
import { getBackend } from './backends';
import { useState } from 'react';
import AppBarTop from './components/AppBarTop';
import WalletView from './routes/WalletView';

const backend = getBackend();

function App() {
  return (
    <BackendProvider>
      <WalletView />
      {/* <div className="App">
        <p>Hello world</p>
        <p>{JSON.stringify(w)}</p>
      </div>
      <Button onClick={() => create()}>Create</Button>
      <Button onClick={() => get()}>Get</Button>
      <WalletActionView /> */}
    </BackendProvider>
  );
}

export default App;
