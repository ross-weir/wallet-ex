import { Container, Group, Stack, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Container as IoCContainer } from 'typedi';

import { useAuthenticatedWallet, Wallet, WalletService } from '@/internal';

import { AddWalletTrigger } from './AddWalletTrigger';
import { LoginForm } from './LoginForm/LoginForm';
import { WalletDetail } from './WalletDetail/WalletDetail';

export function WalletListPage() {
  const { t } = useTranslation(['walletsList', 'common']);
  const { setAuthenticatedWallet } = useAuthenticatedWallet();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const walletService = IoCContainer.get(WalletService);
  const modals = useModals();

  useEffect(() => {
    walletService
      .list()
      .then(setWallets)
      .finally(() => setIsLoading(false));
  }, [walletService]);

  const openLoginModal = (wallet: Wallet) => {
    const id = modals.openModal({
      title: t('walletsList:walletPasswordTitle', { walletName: wallet.name }),
      children: (
        <LoginForm
          onCancel={() => modals.closeModal(id)}
          onSubmit={(form, setLoading) => {
            const { password } = form.values;

            wallet
              .checkCredentials(password)
              .then(async (isValid: boolean) => {
                if (!isValid) {
                  form.setFieldError('password', t('common:incorrectPassword'));

                  return;
                }

                const seed = await wallet.retrieveSeed(password);

                setAuthenticatedWallet({ wallet, seed });

                navigate(`/wallets/${wallet.id}`);
                modals.closeModal(id);
              })
              .finally(() => setLoading(false));
          }}
        />
      ),
    });
  };

  return (
    <>
      <Container size="sm">
        <Group position="center" spacing="xl" pb="xl">
          <Title order={3}>{t('walletsList:walletsListTitle')}</Title>
          <AddWalletTrigger
            onAddWallet={async (form, setLoading) => {
              const { name, password, mnemonic } = form.values;
              const { wallet, seed } = await walletService.create({
                name,
                password,
                mnemonic,
                mnemonicPass: '',
              });

              setAuthenticatedWallet({ wallet, seed });

              navigate(`/wallets/${wallet.id}`);

              modals.closeAll();
              setLoading(false);
            }}
          />
        </Group>

        <Stack align="center" justify="flex-start" spacing="xl">
          {wallets.map((wallet) => (
            <WalletDetail
              key={wallet!.id}
              wallet={wallet!}
              onClick={() => openLoginModal(wallet)}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}
