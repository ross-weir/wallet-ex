import { Wallet, WalletService } from '@/internal';
import { Group, Paper, Stack, Title, Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container as IoCContainer } from 'typedi';
import { LoginModal } from './LoginModal/LoginModal';
import { AddWalletTrigger, WalletFormSchema } from './AddWalletTrigger';
import { WalletDetail } from './WalletDetail/WalletDetail';

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

  const onAddWallet = (form: WalletFormSchema) => {};

  const onLogin = () => {};

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
          <AddWalletTrigger onAddWallet={onAddWallet} />
        </Group>

        <Stack align="center" justify="flex-start" spacing="xl">
          {wallets.map((wallet) => (
            <WalletDetail
              wallet={wallet!}
              onClick={() => setSelectedWallet(wallet)}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}
