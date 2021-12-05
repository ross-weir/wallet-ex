import WalletActionView from './components/WalletActionView';
import { BackendProvider } from './hooks';

import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
import { getBackend } from './backends';
import { useState } from 'react';
import { Wallet } from './entities';

const backend = getBackend();

function App() {
  const [w, setW] = useState<Wallet | undefined>();

  const create = async () => {
    const ww = await backend.createWallet({
      name: 'tester',
      interface: 'local',
    });
    setW(ww as Wallet);
  };

  const get = async () => {
    const ww = await backend.getWallet({
      id: 4,
    });
    setW(ww as Wallet);
  };

  return (
    <BackendProvider>
      <div className="App">
        <p>Hello world</p>
        <p>{JSON.stringify(w)}</p>
      </div>
      <Button onClick={() => create()}>Create</Button>
      <Button onClick={() => get()}>Get</Button>
      <WalletActionView />
    </BackendProvider>
  );
}

export default App;
