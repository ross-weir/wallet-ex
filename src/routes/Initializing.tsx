import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import {
  Blockchain,
  BlockchainState,
  getConfiguredBlockchain,
} from '../blockchains';

export function Initializing() {
  const { t } = useTranslation('initializing');
  const navigate = useNavigate();
  const [state, setState] = useState('Loading');
  const [height, setHeight] = useState(0);
  const [blockchain, setBlockchain] = useState<Blockchain>();

  const getStateText = (state: string): string => t(`state.${state}`);

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
      setState(getStateText(newState));

      const handler = handlerMap[newState];

      if (handler) {
        handler(b);
      }
    };

  useEffect(() => {
    const fn = async () => {
      const bc = await getConfiguredBlockchain();

      setBlockchain(bc);
      setState(getStateText(bc.state));

      // also get dependencyManager events and update the state
      bc.on('stateChanged', onBlockchainStateChanged(bc));
      bc.initialize();
    };

    fn();
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      if (!blockchain || blockchain.state !== BlockchainState.Ready) {
        return;
      }

      try {
        const { description, height } = await blockchain.getSyncStatus();

        setState(description);
        setHeight(height);

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
        <p style={{ marginBottom: 0 }}>{state}</p>
        {!!height && <p>{height}</p>}
      </Loader>
    </>
  );
}
