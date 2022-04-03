import { Avatar, DefaultProps, Group, UnstyledButton } from '@mantine/core';

import { Account, getIconForBlockchain } from '@/internal';

import useStyles from './AccountDetail.styles';
import { AccountText } from './AccountText/AccountText';

interface AccountDetailProps {
  account: Account;
  selected: boolean;
  onClick: () => void;
}

export function AccountDetail({
  account,
  selected,
  onClick,
}: AccountDetailProps & DefaultProps) {
  const { classes, cx } = useStyles();

  return (
    <UnstyledButton
      className={cx(classes.container, classes.inner, {
        [classes.selected]: selected,
      })}
      onClick={onClick}
    >
      <Group>
        <Avatar
          size="sm"
          src={getIconForBlockchain(account.blockchainName, account.network)}
        />
        <AccountText account={account} />
      </Group>
    </UnstyledButton>
  );
}
