import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dimmer,
  Header,
  Loader,
  Segment,
  Table,
} from 'semantic-ui-react';
import Container from 'typedi';

import { Account, Address, AddressService, WalletContext } from '@/internal';

import CopyIcon from '../CopyIcon';
import ErgDisplay from '../ErgDisplay';
import QrIconPopup from '../QrIconPopup';
import SensitiveComponent from '../SensitiveComponent';

export interface WalletViewReceiveTabProps {
  walletCtx: WalletContext;
  account: Account;
}

// TODO: paginate addresses?
// TODO: display "create address" snackbar: https://www.npmjs.com/package/react-simple-snackbar
function WalletViewReceiveTab({
  walletCtx,
  account,
}: WalletViewReceiveTabProps) {
  const { t } = useTranslation('walletReceiveTab');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeriving, setIsDeriving] = useState(false);
  const addressService = Container.get(AddressService);
  let latestAddress!: Address;
  const { wallet, seed } = walletCtx;

  // Only trigger reload if accountId changes
  // When creating a new address we will add it to the state locally on success
  useEffect(() => {
    setIsLoading(true);

    addressService
      .filterByAccountId(account.id)
      .then(setAddresses)
      .catch((err) => console.log(`handle this m8: ${err}`))
      .finally(() => setIsLoading(false));
  }, [account.id]);

  const onNewAddress = async () => {
    setIsDeriving(true);
    try {
      const addressIdx = latestAddress.deriveIdx + 1;
      const newAddr = await wallet.deriveAddress({
        seed,
        accountIdx: account.deriveIdx,
        addressIdx,
      });
      const addr = await addressService.create({
        address: newAddr,
        accountId: account.id,
        deriveIdx: addressIdx,
      });

      setAddresses((addrs) => [...addrs, addr]);
      // TODO: handle err
    } finally {
      setIsDeriving(false);
    }
  };

  if (addresses.length) {
    latestAddress = addresses.reduce((prev, current) =>
      prev.deriveIdx > current.deriveIdx ? prev : current,
    );
  }

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
                    {latestAddress.address}
                    <CopyIcon
                      textToCopy={latestAddress.address}
                      iconStyle={{ marginLeft: 5 }}
                    />
                    <QrIconPopup
                      value={latestAddress.address}
                      coinType={account.coinType}
                    />
                  </div>
                </SensitiveComponent>
              )}
            </Segment>
            <Button
              primary
              onClick={onNewAddress}
              loading={isDeriving}
              disabled={isDeriving}
            >
              {t('newAddressButton')}
            </Button>
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
                          iconStyle={{ marginLeft: 15 }}
                        />
                        <QrIconPopup
                          value={addr.address}
                          coinType={account.coinType}
                        />
                      </SensitiveComponent>
                    </Table.Cell>
                    <Table.Cell>
                      <ErgDisplay balance={addr.balance} />
                    </Table.Cell>
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
