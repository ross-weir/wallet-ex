// nested routes:
// - send, recv, transactions inside <Outlet />

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Menu,
  Tab,
} from 'semantic-ui-react';
import AppBarTop from '../components/AppBarTop';
import SensitiveComponent from '../components/SensitiveComponent';
import walletImg from '../components/WalletDetailCard/wallet.svg';
import WalletViewReceiveTab from '../components/WalletViewReceiveTab';
import { Account, Wallet } from '../entities';
import { BackendProvider, useBackend } from '../hooks';
import { capitalize } from '../utils/formatting';

function WalletView() {
  // at this point we should be at /wallets/{id}/accounts/{accountId}
  // the code that directs to WalletView should also have the id of it's first ever accountId
  // If we're creating/restoring we will have the accountId because that creator/restoring will create
  // the initial account.
  // If we're coming from a wallet list then I guess that will also need to have details about the wallets
  // accounts including the first wallet accounts Id - the wallet list page could list account count etc

  // There should always be a selected account, not sure when we wouldn't want that to be the case
  // Default to the first account for the wallet, there should always be one when creating wallet
  const { t } = useTranslation(['common', 'walletView']);
  const { walletId: walletIdParam } = useParams();
  const backend = useBackend();
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState<Wallet | undefined>();
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const [walletSeed, setWalletSeed] = useState<Uint8Array | undefined>();
  const { state } = useLocation();

  if (!walletSeed && state.seed) {
    setWalletSeed(state.seed);
  }

  const onLogoutWallet = () => {
    // Remove the seed from browser history state so users can't
    // navigate backwards and preserve access to wallet seed
    const usr = { ...window.history.state.usr, seed: undefined };
    window.history.replaceState({ ...window.history.state, usr }, '');
    setWalletSeed(undefined);
  };

  // TODO: loading indicator/state
  // TODO: we probably actually need to fetch a list of accounts
  // TODO: could be done in 1 request - don't bother until there's actual perf issues
  useEffect(() => {
    const fetchEntities = async () => {
      setIsLoading(true);

      const walletId = parseInt(walletIdParam as string, 10);
      const walletReq = backend.findWallet(walletId);
      const accountsReq = backend.accountsForWallet(walletId);
      const [walletResp, accountsResp] = await Promise.allSettled([
        walletReq,
        accountsReq,
      ]);

      if (walletResp.status === 'fulfilled') {
        setWallet(walletResp.value);
      } else {
        // TODO: handle failure
        console.log(walletResp.reason);
      }

      if (accountsResp.status === 'fulfilled') {
        setAccountList(accountsResp.value);
        setSelectedAccount(accountsResp.value[0]);
      } else {
        // TODO: handle failure
        console.log(accountsResp.reason);
      }

      setIsLoading(false);
    };

    fetchEntities();
  }, [walletIdParam, backend]);

  const panes = () => [
    {
      menuItem: {
        key: 'overview',
        icon: 'dashboard',
        content: capitalize(t('common:overview')),
      },
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
    {
      menuItem: {
        key: 'send',
        icon: 'arrow up',
        content: capitalize(t('common:send')),
      },
      render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: {
        key: 'receive',
        icon: 'arrow down',
        content: capitalize(t('common:receive')),
      },
      // typecasting until we have type gaurds ensuring the entities aren't undefined
      render: () => (
        <WalletViewReceiveTab
          account={selectedAccount as Account}
          wallet={wallet as Wallet}
          seed={walletSeed as Uint8Array}
        />
      ),
    },
  ];

  const walletSubtitle = () => {
    const acctCount = `${accountList.length} Account${
      accountList.length > 1 ? 's' : ''
    }`;
    const walletBalance = '$1,000';

    return `${acctCount} · ${walletBalance}`;
  };

  return (
    <>
      <BackendProvider>
        <AppBarTop onLogout={onLogoutWallet} />
        <Grid stackable padded>
          <Grid.Column width={4}>
            <Card onClick={() => null} fluid>
              <Card.Content>
                {isLoading ? (
                  <p>loading..</p>
                ) : (
                  <>
                    <Image src={walletImg} size="mini" floated="left" />
                    <Card.Header>{wallet?.name}</Card.Header>
                    <Card.Meta>
                      <SensitiveComponent>
                        {walletSubtitle()}
                      </SensitiveComponent>
                    </Card.Meta>
                  </>
                )}
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Content>
                <Card.Header
                  style={{
                    lineHeight: 2,
                    display: 'inline-block',
                    verticalAlign: 'middle',
                  }}
                >
                  {t('walletView:myAccounts')}
                </Card.Header>
                <Button floated="right" icon="add" size="tiny" />
              </Card.Content>
              <Menu vertical fluid>
                {accountList.length &&
                  accountList.map((account, idx) => (
                    <Menu.Item
                      key={account.id}
                      active={selectedAccount?.id === account.id}
                      onClick={() => setSelectedAccount(accountList[idx])}
                    >
                      <SensitiveComponent>
                        <Header as="h4">
                          {account.name}
                          <Header.Subheader>$999.00</Header.Subheader>
                        </Header>
                      </SensitiveComponent>
                    </Menu.Item>
                  ))}
              </Menu>
            </Card>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <Container style={{ paddingLeft: 60, paddingRight: 60 }}>
              <Header style={{ marginTop: 15 }} as="h2">
                {selectedAccount &&
                  `${selectedAccount.name} - ${capitalize(
                    t('common:account'),
                  )} #${selectedAccount.deriveIdx}`}
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
      </BackendProvider>
    </>
  );
}

export default WalletView;
