import WalletActionView from './components/WalletActionView';
import { BackendProvider } from './hooks';

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
