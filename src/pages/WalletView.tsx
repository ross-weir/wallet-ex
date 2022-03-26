// nested routes:
// - send, recv, transactions inside <Outlet />

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Container as IocContainer } from 'typedi';

import CreateAccountModal from '@/components/CreateAccountModal';
import SensitiveComponent from '@/components/SensitiveComponent';
import walletImg from '@/components/WalletDetailCard/wallet.svg';
import WalletViewReceiveTab from '@/components/WalletViewReceiveTab';
import { useAuthenticatedWallet } from '@/hooks';
import { Account, AccountService } from '@/internal';
import { capitalize } from '@/utils/fmt';

function WalletView() {
  const { t } = useTranslation(['common', 'walletView']);
  const [isLoading, setIsLoading] = useState(true);
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const accountService = IocContainer.get(AccountService);
  const { wallet, seed } = useAuthenticatedWallet();

  // TODO: loading indicator/state
  useEffect(() => {
    setIsLoading(true);

    accountService
      .filterByWalletId(wallet!.id)
      .then((accounts) => {
        setAccountList(accounts);
        setSelectedAccount(accounts[0]);
      })
      .finally(() => setIsLoading(false));
  }, [wallet, accountService]);

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
          walletCtx={{ wallet: wallet!, seed: seed! }}
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

  const handleAccountCreate = async ({ name }: { name: string }) => {
    const latestAccount = accountList.reduce((prev, current) =>
      prev.deriveIdx > current.deriveIdx ? prev : current,
    );

    const account = await accountService.create(
      { wallet: wallet!, seed: seed! },
      {
        deriveIdx: latestAccount.deriveIdx + 1,
        name,
        coinType: 429,
      },
    );

    setAccountList((accts) => [...accts, account]);
    setSelectedAccount(account);
  };

  return (
    <>
      <Grid style={{ height: 'calc(100% - 55px)' }}>
        <Grid.Column width={3} style={{ paddingBottom: 0 }}>
          <Menu
            vertical
            fluid
            style={{ height: '100%', minWidth: '275px' }}
            borderless
          >
            <Menu.Item>
              <Header as="h3">
                {wallet?.name}
                <Header.Subheader>{walletSubtitle()}</Header.Subheader>
              </Header>
            </Menu.Item>
            <Divider />
            <Menu.Item>
              <Header
                as="h2"
                style={{
                  lineHeight: 1.2,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              >
                {t('walletView:myAccounts')}
              </Header>
              <CreateAccountModal
                handleAccountCreate={handleAccountCreate}
                trigger={<Button floated="right" icon="add" size="mini" />}
              />
            </Menu.Item>
            {accountList.length &&
              accountList.map((account, idx) => (
                <Menu.Item
                  style={{ margin: 8 }}
                  key={account.id}
                  active={selectedAccount?.id === account.id}
                  onClick={() => setSelectedAccount(accountList[idx])}
                >
                  <SensitiveComponent>
                    <Header as="h3">
                      {account.name}
                      <Header.Subheader>$999.00</Header.Subheader>
                    </Header>
                  </SensitiveComponent>
                </Menu.Item>
              ))}
          </Menu>
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
            <Tab menu={{ secondary: true, stackable: true }} panes={panes()} />
          </Container>
        </Grid.Column>
      </Grid>
      {/* <Card onClick={() => null} fluid>
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
            </Card> */}
      {/* <Card fluid>
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
                <CreateAccountModal
                  handleAccountCreate={handleAccountCreate}
                  trigger={<Button floated="right" icon="add" size="tiny" />}
                />
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
            </Card> */}
    </>
  );
}

export default WalletView;
