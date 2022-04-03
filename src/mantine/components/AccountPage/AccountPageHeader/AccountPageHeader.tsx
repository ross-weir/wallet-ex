import { Title } from '@mantine/core';

import { Account } from '@/internal';

import useStyles from './AccountPageHeader.styles';

interface AccountPageHeaderProps {
  account: Account;
}

export function AccountPageHeader({ account }: AccountPageHeaderProps) {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={cx(classes.header)}>
        <Title className={classes.title}>{account.name}</Title>

        {/* account total balance */}
        {/* fiat conversion subtitle with 'powered by' and icon? */}
      </div>
    </div>
  );
}
