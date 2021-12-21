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
import walletImg from '../components/WalletDetailCard/wallet.svg';
import WalletViewReceiveTab from '../components/WalletViewReceiveTab';
import { Account, Wallet } from '../entities';
import { BackendProvider, useBackend } from '../hooks';

const panes = [
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
    render: () => <WalletViewReceiveTab />,
  },
];

function WalletView() {
  // at this point we should be at /wallets/{id}/accounts/{accountId}
  // There should always be a selected account, not sure when we wouldn't want that to be the case
  // Default to the first account for the wallet, there should always be one created when the wallet
  // is created
  const { walletId, accountId } = useParams();
  const backend = useBackend();
  const [wallet, setWallet] = useState<Wallet | undefined>();
  const [account, setAccount] = useState<Account | undefined>();

  // TODO: loading indicator/state
  // TODO: we probably actually need to fetch a list of accounts
  // TODO: could be done in 1 request
  useEffect(() => {
    const fetchEntities = async () => {
      const walletReq = backend.findWallet(parseInt(walletId as string, 10));
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

  return (
    <>
      <BackendProvider>
        <AppBarTop />
        <Grid stackable padded>
          <Grid.Column width={4}>
            <Card onClick={() => null} fluid>
              <Card.Content>
                <Image src={walletImg} size="mini" floated="left" />
                <Card.Header>My ergo wallet</Card.Header>
                <Card.Meta>3 Accounts · $1,000.00</Card.Meta>
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Content>
                <Card.Header>My accounts</Card.Header>
                <Icon name="add" link href="www.google.com" />
              </Card.Content>
              <Card.Content>Coming soon</Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <Container style={{ paddingLeft: 60, paddingRight: 60 }}>
              <Header style={{ marginTop: 15 }} as="h2">
                Ergo account #1
              </Header>
              <p>0.02484236 BTC ≈ A$1,672.36</p>
              <Divider />
              <Tab menu={{ secondary: true, stackable: true }} panes={panes} />
            </Container>
          </Grid.Column>
        </Grid>
      </BackendProvider>
    </>
  );
}

export default WalletView;
