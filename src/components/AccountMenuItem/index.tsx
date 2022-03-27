import { Header, Image, Menu } from 'semantic-ui-react';

import {
  Account,
  coinTypeToBlockchain,
  getIconForBlockchain,
} from '@/internal';

import SensitiveComponent from '../SensitiveComponent';

export interface AccountMenuItemProps {
  account: Account;
  active: boolean;
  onClick: () => void;
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
          src={getIconForBlockchain(
            coinTypeToBlockchain(account.coinType),
            account.network,
          )}
          floated="left"
        />
        <span style={{ lineHeight: 2 }}>
          <Header as="h3" style={{ marginLeft: 35 }}>
            {account.name}
            <Header.Subheader style={{ lineHeight: 1.6 }}>
              Ergo Testnet
              <br />
              316.0012 ERG
              <br />≈ $999.00 USD
            </Header.Subheader>
          </Header>
        </span>
      </SensitiveComponent>
    </Menu.Item>
  );
}
