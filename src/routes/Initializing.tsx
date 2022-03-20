import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Blockchain,
  BlockchainState,
  getConfiguredBlockchain,
} from '../blockchains';

export function Initializing() {
  const navigate = useNavigate();
  const [state, setState] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [blockchain, setBlockchain] = useState<Blockchain>();

  useEffect(() => {
    const fn = async () => {
      const bc = await getConfiguredBlockchain();

      setBlockchain(bc);
      setState(readableStateMap[bc.state]);

      bc.on('stateChanged', onBlockchainStateChanged);
      bc.initialize();

      setIsLoading(false);
    };

    fn();
  }, []);

  const onBlockchainReady = () => {
    blockchain!.monitor();

    if (!blockchain!.hasLocalNode) {
      navigate('/wallets');
    }
  };

  const handlerMap: Partial<Record<BlockchainState, () => void>> = {
    [BlockchainState.Ready]: onBlockchainReady,
  };

  const readableStateMap: Record<BlockchainState, string> = {
    [BlockchainState.Stopped]: 'Stopped',
    [BlockchainState.CheckingDependencies]: 'Checking blockchain dependencies',
    [BlockchainState.Ready]: 'Blockchain is ready',
    [BlockchainState.Initializing]: 'Starting blockchain resources',
    [BlockchainState.Syncing]: 'Syncing blockchain',
    [BlockchainState.ShuttingDown]: 'Shutting down blockchain resources',
    [BlockchainState.Error]: 'Something went wrong',
  };

  const onBlockchainStateChanged = (newState: BlockchainState) => {
    setState(newState);

    const handler = handlerMap[newState];

    if (handler) {
      handler();
    }
  };

  // block navigate

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <>
      <p>{state}</p>
    </>
  );
}
