import { insertDecimal } from '@/internal';
import { Text, TextProps, useMantineTheme } from '@mantine/core';

interface BalanceTextProps {
  value: number | string;
  decimals?: number;
  trimZeroes?: boolean;
  // if value is zero use this string
  fallback?: string;
}

export function BalanceText({
  value,
  decimals,
  trimZeroes,
  fallback,
  ...rest
}: BalanceTextProps & TextProps<'div'>) {
  const theme = useMantineTheme();

  // using '==' non-strict check for '0' and 0
  if (value == 0 && !!fallback) {
    value = fallback;
  } else if (!!decimals) {
    value = insertDecimal(value, decimals, trimZeroes);
  }

  return (
    <Text {...rest} style={{ fontFamily: theme.fontFamilyMonospace }}>
      {value}
    </Text>
  );
}
