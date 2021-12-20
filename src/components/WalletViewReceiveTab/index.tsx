import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Loader,
  Segment,
} from 'semantic-ui-react';
import { Address } from '../../entities';
import { useBackend } from '../../hooks';

function WalletViewReceiveTab() {
  const { t } = useTranslation('walletReceiveTab');
  const { accountId } = useParams();
  const backend = useBackend();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    backend
      .addressesForAccount(parseInt(accountId as string, 10))
      .then((addresses) => setAddresses(addresses))
      .catch((err) => console.log(`handle this m8: ${err}`));

    setIsLoading(false);
  }, []);

  // Latest address is the highest derive index
  const latestAddress = () =>
    addresses.reduce((prev, current) =>
      prev.deriveIdx > current.deriveIdx ? prev : current,
    );

  // Generate new address action, needs access to address index and coin type
  // Need a `useAccount` hook so we have access to the coin type?
  // Could likely just be passed in from parent as a prop
  const onNewAddress = () => {
    const newIdx = latestAddress().deriveIdx + 1;
    const coinType = ''; // get coin type
    // do derivation and get address
    // send to backend
    // add to local addresses state OR force refresh if adding to local state causes a reload anyway
  };

  return (
    <>
      <Segment padded="very">
        {isLoading ? (
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        ) : (
          <>
            <Header dividing>
              {t('header')}
              <Header.Subheader>{t('headerSubheader')}</Header.Subheader>
            </Header>
            <Segment
              style={{ cursor: 'pointer', fontFamily: 'Fira Code, monospace' }}
              size="large"
              onClick={() => console.log('test')}
            >
              {/* 9fHqrP7wvx7MRpzbaH73kaMw8YSRMYwuMqvtJVMVNx1LzkrfTfp */}
              {latestAddress().address}
              <Icon style={{ paddingLeft: 5 }} name="copy outline" link />
            </Segment>
            <Button onClick={onNewAddress}>{t('newAddressButton')}</Button>
          </>
        )}
      </Segment>
    </>
  );
}

export default WalletViewReceiveTab;
