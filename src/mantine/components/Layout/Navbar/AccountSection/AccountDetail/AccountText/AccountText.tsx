import { Box, Text, TextProps } from '@mantine/core';

import { Account, capitalize } from '@/internal';

interface AccountTextProps {
  account: Account;
}

const subtitleProps: TextProps<'div'> = { color: 'dimmed', size: 'sm' };

export function AccountText({ account }: AccountTextProps) {
  const { blockchainName, network, deriveIdx } = account;
  const subtitle = `${capitalize(blockchainName)} ${capitalize(
    network,
  )} - #${deriveIdx}`;
  const balance = '316.0012 ERG';
  const fiatBalance = '≈ $999.00 USD';

  return (
    <Box>
      <Text>{account.name}</Text>
      <Text {...subtitleProps}>{subtitle}</Text>
      <Text {...subtitleProps}>{balance}</Text>
      <Text {...subtitleProps}>{fiatBalance}</Text>
    </Box>
  );
}
