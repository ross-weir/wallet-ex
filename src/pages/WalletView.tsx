import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
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

  const getDeriveIndex = (coinType: number, network: string) => {
    const hasExisting = accountList.find(
      (a) => a.coinType === coinType && a.network === network,
    );

    if (!hasExisting) {
      return 0;
    }

    const latestAccount = accountList.reduce((prev, current) => {
      if (
        prev.network === current.network &&
        prev.coinType === current.coinType
      ) {
        return prev.deriveIdx > current.deriveIdx ? prev : current;
      }

      return prev;
    });

    return latestAccount.deriveIdx + 1;
  };

  const handleAccountCreate = async ({
    name,
    coinType,
    network,
  }: CreateAccountForm) => {
    const deriveIdx = getDeriveIndex(coinType, network);

    console.log(name, coinType, network);

    const account = await accountService.create(
      { wallet: wallet!, seed: seed! },
      {
        deriveIdx,
        name,
        network,
        coinType,
      },
    );

    setAccountList((accts) => [...accts, account]);
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
            {!!accountList.length &&
              accountList.map((account, idx) => (
                <AccountMenuItem
                  account={account}
                  active={selectedAccount?.id === account.id}
                  onClick={() => setSelectedAccount(accountList[idx])}
                />
              ))}
          </Menu>
          <Menu
            vertical
            fluid
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
