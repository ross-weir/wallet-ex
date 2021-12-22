import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  Button,
  Dimmer,
  Header,
  Loader,
  Segment,
  Table,
} from 'semantic-ui-react';
import { Account, Address, Wallet } from '../../entities';
import { useBackend } from '../../hooks';
import CopyIcon from '../CopyIcon';
import SensitiveComponent from '../SensitiveComponent';

const copyIconStyle = { paddingLeft: 5 };

export interface WalletViewReceiveTabProps {
  wallet: Wallet;
  account: Account;
}

// TODO: paginate addresses?
// TODO: display "create address" snackbar: https://www.npmjs.com/package/react-simple-snackbar
function WalletViewReceiveTab({ wallet, account }: WalletViewReceiveTabProps) {
  const { t } = useTranslation('walletReceiveTab');
  const backend = useBackend();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Only trigger reload if accountId changes
  // When creating a new address we will add it to the state locally on success
  useEffect(() => {
    setIsLoading(true);

    backend
      .addressesForAccount(account.id)
      .then((addresses) => setAddresses(addresses))
      .catch((err) => console.log(`handle this m8: ${err}`));

    setIsLoading(false);
  }, [account.id]);

  // Latest address is the highest derive index
  const latestAddress = () =>
    addresses.reduce((prev, current) =>
      prev.deriveIdx > current.deriveIdx ? prev : current,
    );

  // Generate new address action, needs access to address index and coin type
  // Need a `useAccount` hook so we have access to the coin type?
  // Could likely just be passed in from parent as a prop
  // Need Account/Wallet as props - why do we need wallet?
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
            <Segment size="large">
              {addresses.length && (
                <SensitiveComponent>
                  <div style={{ fontFamily: 'Fira Code, monospace' }}>
                    {latestAddress().address}
                    <CopyIcon
                      textToCopy={latestAddress().address}
                      iconStyle={copyIconStyle}
                    />
                  </div>
                </SensitiveComponent>
              )}
            </Segment>
            <Button onClick={onNewAddress}>{t('newAddressButton')}</Button>
          </>
        )}
      </Segment>

      <Segment padded="very">
        {isLoading ? (
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        ) : (
          <>
            <Header dividing>
              {t('previousAddressesHeader')}
              <Header.Subheader>
                {t('previousAddressesSubheader')}
              </Header.Subheader>
            </Header>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>Balance</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {[...addresses].reverse().map((addr) => (
                  <Table.Row key={addr.id}>
                    <Table.Cell style={{ fontFamily: 'Fira Code, monospace' }}>
                      <SensitiveComponent>
                        {addr.address}
                        <CopyIcon
                          textToCopy={addr.address}
                          iconStyle={copyIconStyle}
                        />
                      </SensitiveComponent>
                    </Table.Cell>
                    <Table.Cell>
                      <SensitiveComponent>{addr.balance}</SensitiveComponent>
                    </Table.Cell>
                    {/* <Table.Cell>QR code button</Table.Cell> */}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        )}
      </Segment>
    </>
  );
}

export default WalletViewReceiveTab;
