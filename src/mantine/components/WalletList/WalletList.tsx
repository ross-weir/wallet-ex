import { Wallet, WalletService } from '@/internal';
import { Group, Paper, Stack, Title, Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container as IoCContainer } from 'typedi';
import { WalletOverviewBox } from '@@/components/WalletOverviewBox';
import { LoginModal } from './LoginModal';
import { AddWalletTrigger } from './AddWallet';

export function WalletList() {
  const { t } = useTranslation(['walletsList', 'common']);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const walletService = IoCContainer.get(WalletService);

  useEffect(() => {
    walletService
      .list()
      .then(setWallets)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {!!selectedWallet && (
        <LoginModal
          onClose={() => setSelectedWallet(undefined)}
          wallet={selectedWallet!}
        />
      )}

      <Container size="sm">
        <Group position="center" spacing="xl" pb="xl">
          <Title order={3}>{t('walletsList:walletsListTitle')}</Title>
          <AddWalletTrigger />
        </Group>

        <Stack align="center" justify="flex-start" spacing="xl">
          {wallets.map((wallet) => (
            <Paper
              shadow="xs"
              radius="md"
              sx={{ width: '100%' }}
              onClick={() => setSelectedWallet(wallet)}
            >
              <WalletOverviewBox wallet={wallet} />
            </Paper>
          ))}
        </Stack>
      </Container>
    </>
  );
}
