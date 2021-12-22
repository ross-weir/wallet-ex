// nested routes:
// - send, recv, transactions inside <Outlet />

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Tab,
} from 'semantic-ui-react';
import AppBarTop from '../components/AppBarTop';
import SensitiveComponent from '../components/SensitiveComponent';
import walletImg from '../components/WalletDetailCard/wallet.svg';
import WalletViewReceiveTab from '../components/WalletViewReceiveTab';
import { Account, Wallet } from '../entities';
import { BackendProvider, SensitiveModeProvider, useBackend } from '../hooks';

function WalletView() {
  // at this point we should be at /wallets/{id}/accounts/{accountId}
  // the code that directs to WalletView should also have the id of it's first ever accountId
  // If we're creating/restoring we will have the accountId because that creator/restoring will create
  // the initial account.
  // If we're coming from a wallet list then I guess that will also need to have details about the wallets
  // accounts including the first wallet accounts Id - the wallet list page could list account count etc

  // There should always be a selected account, not sure when we wouldn't want that to be the case
  // Default to the first account for the wallet, there should always be one when creating wallet
  const { walletId, accountId } = useParams();
  const backend = useBackend();
  const [wallet, setWallet] = useState<Wallet | undefined>();
  // what do we need a single account for?
  // tabs could get the info they need using the accountId url param
  // we need accountList to populate `Accounts` sidebar
  const [account, setAccount] = useState<Account | undefined>();

  // TODO: loading indicator/state
  // TODO: we probably actually need to fetch a list of accounts
  // TODO: could be done in 1 request - don't bother until there's actual perf issues
  useEffect(() => {
    const fetchEntities = async () => {
      const walletReq = backend.findWallet(parseInt(walletId as string, 10));
      // need to get a list of accounts
      const accountReq = backend.findAccount(parseInt(accountId as string, 10));
      const [walletResp, accountResp] = await Promise.allSettled([
        walletReq,
        accountReq,
      ]);

      if (walletResp.status === 'fulfilled') {
        setWallet(walletResp.value);
      } else {
        // TODO: handle failure
      }

      if (accountResp.status === 'fulfilled') {
        setAccount(accountResp.value);
      } else {
        // TODO: handle failure
      }
    };

    fetchEntities();
  }, [walletId, accountId]);

  const panes = () => [
    {
      menuItem: { key: 'overview', icon: 'dashboard', content: 'Overview' },
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
    {
      menuItem: { key: 'send', icon: 'arrow up', content: 'Send' },
      render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: { key: 'receive', icon: 'arrow down', content: 'Receive' },
      // typecasting until we have type gaurds ensuring the entities aren't undefined
      render: () => (
        <WalletViewReceiveTab
          account={account as Account}
          wallet={wallet as Wallet}
        />
      ),
    },
  ];

  return (
    <>
      <BackendProvider>
        <SensitiveModeProvider>
          <AppBarTop />
          <Grid stackable padded>
            <Grid.Column width={4}>
              <Card onClick={() => null} fluid>
                <Card.Content>
                  <Image src={walletImg} size="mini" floated="left" />
                  <Card.Header>{wallet?.name}</Card.Header>
                  <Card.Meta>
                    <SensitiveComponent>
                      3 Accounts · $1,000.00
                    </SensitiveComponent>
                  </Card.Meta>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header>My Accounts</Card.Header>
                  <Icon name="add" link href="www.google.com" />
                </Card.Content>
                {/* List of accounts with ERG balance / fiat conversion */}
                <Card.Content>Coming soon</Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column stretched width={12}>
              <Container style={{ paddingLeft: 60, paddingRight: 60 }}>
                <Header style={{ marginTop: 15 }} as="h2">
                  {account && `${account.name} - Account #${account.deriveIdx}`}
                </Header>
                <SensitiveComponent>
                  <p>0.02484236 BTC ≈ A$1,672.36</p>
                </SensitiveComponent>
                <Divider />
                <Tab
                  menu={{ secondary: true, stackable: true }}
                  panes={panes()}
                />
              </Container>
            </Grid.Column>
          </Grid>
        </SensitiveModeProvider>
      </BackendProvider>
    </>
  );
}

export default WalletView;
