import { Paper } from '@mantine/core';

import { Wallet } from '@/internal';
import { WalletOverviewBox } from '@@/components/WalletOverviewBox';

interface WalletDetailProps {
  wallet: Wallet;
  onClick: () => void;
}

export function WalletDetail({ wallet, onClick }: WalletDetailProps) {
  return (
    <Paper shadow="xs" radius="md" sx={{ width: '100%' }} onClick={onClick}>
      <WalletOverviewBox wallet={wallet} />
    </Paper>
  );
}
