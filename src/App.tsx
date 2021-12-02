import WalletActionView from './components/WalletActionView';
import { BackendProvider } from './hooks';

import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <BackendProvider>
      <div className="App">
        <p>Hello world</p>
      </div>
      <WalletActionView />
    </BackendProvider>
  );
}

export default App;
