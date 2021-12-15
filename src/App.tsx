import WalletActionView from './components/WalletActionView';
import { BackendProvider } from './hooks';

import { Button, Menu, Segment } from 'semantic-ui-react';
import AppBarTop from './components/AppBarTop';
import WalletView from './routes/WalletView';
import { TestComp } from './TestComp';

function App() {
  return (
    <BackendProvider>
      <TestComp />
      {/* <WalletView /> */}
      {/* <WalletActionView /> */}
    </BackendProvider>
  );
}

export default App;
