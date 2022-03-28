import { Header, Image, Menu } from 'semantic-ui-react';

import { Account, getIconForBlockchain } from '@/internal';
import { capitalize } from '@/utils/fmt';

import SensitiveComponent from '../SensitiveComponent';

export interface AccountMenuItemProps {
  account: Account;
  active: boolean;
  onClick: () => void;
}

function AccountSubtitle({ account }: { account: Account }) {
  const { blockchainName: blockchain, network, deriveIdx } = account;
  const subtitle = `${capitalize(blockchain)} ${capitalize(
    network,
  )} - #${deriveIdx}`;

  return (
    <>
      {subtitle}
      <br />
      316.0012 ERG
      <br />≈ $999.00 USD
    </>
  );
}

export function AccountMenuItem({
  account,
  active,
  onClick,
}: AccountMenuItemProps) {
  return (
    <Menu.Item
      style={{ margin: 8 }}
      key={account.id}
      active={active}
      onClick={onClick}
    >
      <SensitiveComponent>
        <Image
          style={{ height: 25, width: 25 }}
          src={getIconForBlockchain(account.blockchainName, account.network)}
          floated="left"
        />
        <span style={{ lineHeight: 2 }}>
          <Header as="h3" style={{ marginLeft: 38 }}>
            {account.name}
            <Header.Subheader style={{ lineHeight: 1.6 }}>
              <AccountSubtitle account={account} />
            </Header.Subheader>
          </Header>
        </span>
      </SensitiveComponent>
    </Menu.Item>
  );
}
