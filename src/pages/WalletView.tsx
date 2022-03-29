import { identicon } from 'minidenticons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Label,
  Menu,
  Tab,
} from 'semantic-ui-react';
import { Container as IocContainer } from 'typedi';

import { AccountMenuItem } from '@/components/AccountMenuItem';
import CreateAccountModal, {
  CreateAccountForm,
} from '@/components/CreateAccountModal';
import SensitiveComponent from '@/components/SensitiveComponent';
import WalletViewReceiveTab from '@/components/WalletViewReceiveTab';
import { useAuthenticatedWallet, useEntities } from '@/hooks';
import { Account, AccountService } from '@/internal';
import { capitalize, toBase16 } from '@/utils/fmt';

function WalletView() {
  const { t } = useTranslation(['common', 'walletView']);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const accountService = IocContainer.get(AccountService);
  const { wallet, seed } = useAuthenticatedWallet();
  const { accounts, setAccounts } = useEntities();

  useEffect(() => {
    if (accounts.length && !selectedAccount) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts, selectedAccount]);

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
    const acctCount = `${accounts.length} Account${
      accounts.length > 1 ? 's' : ''
    }`;
    const walletBalance = '$1,000';

    return `${acctCount} · ${walletBalance}`;
  };

  const handleAccountCreate = async ({
    name,
    blockchainName,
    network,
  }: CreateAccountForm) => {
    const deriveIdx = accountService.getNextDeriveIndex(
      accounts,
      blockchainName,
      network,
    );
    const account = await accountService.create(
      { wallet: wallet!, seed: seed! },
      {
        deriveIdx,
        name,
        network,
        blockchainName,
      },
    );

    // fetch useLocalInfra from config
    account.initBlockchain({ useLocalInfra: false });
    setAccounts((accounts) => [...accounts, account]);
    setSelectedAccount(account);
  };

  return (
    <>
      {/* appbar + bottom menu */}
      <Grid style={{ height: 'calc(100% - (55px + 120px))' }}>
        <Grid.Column width={3} style={{ paddingBottom: 0 }}>
          <Menu
            vertical
            style={{
              height: '100%',
              minWidth: '300px',
            }}
            borderless
            attached="top"
          >
            <Menu.Item>
              <Header as="h3">
                <Image
                  style={{ background: '#F0F0F0' }}
                  bordered
                  avatar
                  circular
                  size="huge"
                  floated="left"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    identicon(toBase16(seed!), 80, 30),
                  )}`}
                />
                {wallet?.name}
                <Label size="tiny">Software wallet</Label>
                <Header.Subheader style={{ marginTop: 8 }}>
                  {walletSubtitle()}
                </Header.Subheader>
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
            {!!accounts.length &&
              accounts.map((account, idx) => (
                <AccountMenuItem
                  account={account}
                  active={selectedAccount?.id === account.id}
                  onClick={() => setSelectedAccount(accounts[idx])}
                />
              ))}
          </Menu>
          <Menu
            vertical
            style={{
              minWidth: '300px',
              height: 120,
            }}
            attached
          >
            <Menu.Item>
              <Header size="small">
                Local Infrastructure
                <Header.Subheader>
                  No locally running infrastructure.
                </Header.Subheader>
              </Header>
            </Menu.Item>
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
    </>
  );
}

export default WalletView;
