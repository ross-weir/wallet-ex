import {
  Box,
  Group,
  Image,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { identicon } from 'minidenticons';

import { Wallet } from '@/internal';

export interface WalletOverviewBoxProps {
  wallet: Wallet;
}

export function WalletOverviewBox({ wallet }: WalletOverviewBoxProps) {
  const theme = useMantineTheme();

  return (
    <Box
      sx={(theme) => ({
        border: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Image
            radius="md"
            height={36}
            width={36}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              identicon('hererssstest', 80, 30),
            )}`}
          />
          <Text size="lg">{wallet?.name}</Text>
        </Group>
      </UnstyledButton>
    </Box>
  );
}
