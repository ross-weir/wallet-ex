// nested routes:
// - send, recv, transactions inside <Outlet />

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
import { Wallet } from '../entities';
import { BackendProvider } from '../hooks';

const mockWallet: Wallet = {
  createdAt: '2021-12-06T03:04:43',
  id: 2,
  interface: 'local',
  name: 'Ergo Wallet',
};

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
