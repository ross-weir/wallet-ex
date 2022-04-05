import { Text,Title } from '@mantine/core';

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
        <Title className={classes.title} order={1}>
          {account.name}
        </Title>

        <div className={classes.description}>
          <Text>{'319.000000 ERG'}</Text>
          <Text>= $19 USD - powered by coingecko</Text>
        </div>
      </div>
    </div>
  );
}
