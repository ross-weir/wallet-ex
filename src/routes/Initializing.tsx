import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import {
  Blockchain,
  BlockchainState,
  getConfiguredBlockchain,
} from '../blockchains';

export function Initializing() {
  const navigate = useNavigate();
  const [state, setState] = useState('Loading');
  const [blockchain, setBlockchain] = useState<Blockchain>();

  const onBlockchainReady = (bc: Blockchain) => {
    if (!bc.hasLocalNode) {
      navigate('/wallets');
    }
  };

  const handlerMap: Partial<Record<BlockchainState, (b: Blockchain) => void>> =
    {
      [BlockchainState.Ready]: onBlockchainReady,
    };

  const onBlockchainStateChanged =
    (b: Blockchain) => (newState: BlockchainState) => {
      setState(readableStateMap[newState]);

      const handler = handlerMap[newState];

      if (handler) {
        handler(b);
      }
    };

  useEffect(() => {
    const fn = async () => {
      const bc = await getConfiguredBlockchain();

      setBlockchain(bc);
      setState(readableStateMap[bc.state]);

      bc.on('stateChanged', onBlockchainStateChanged(bc));
      bc.initialize();
    };

    fn();
  }, []);

  const readableStateMap: Record<BlockchainState, string> = {
    [BlockchainState.Stopped]: 'Stopped',
    [BlockchainState.CheckingDependencies]: 'Checking blockchain dependencies',
    [BlockchainState.Ready]: 'Beginning blockchain sync...',
    [BlockchainState.Initializing]: 'Starting blockchain resources',
    [BlockchainState.ShuttingDown]: 'Shutting down blockchain resources',
    [BlockchainState.Error]: 'Something went wrong',
  };

  useEffect(() => {
    const handle = setInterval(async () => {
      if (!blockchain || blockchain.state !== BlockchainState.Ready) {
        return;
      }

      try {
        const status = await blockchain.getStatus();

        setState(status.description);

        // if synced, navigate to wallet
      } catch (e) {}
    }, 3000);

    return () => {
      clearInterval(handle);
    };
  }, [blockchain]);

  // block navigate

  return (
    <>
      <Loader active indeterminate size="massive">
        {state}
      </Loader>
    </>
  );
}
