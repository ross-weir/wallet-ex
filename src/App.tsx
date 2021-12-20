import WalletActionView from './components/WalletActionView';
import { BackendProvider } from './hooks';
import { useNavigate } from 'react-router-dom';

import { Button, Menu, Segment } from 'semantic-ui-react';
import AppBarTop from './components/AppBarTop';
import WalletView from './routes/WalletView';
import { TestComp } from './TestComp';

function App() {
  let navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/wallets/1/accounts/1')}>
      Go to wallet view
    </Button>
  );
}

export default App;
