import { Wallet, useAuthenticatedWallet } from '@/internal';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  PasswordInput,
} from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { capitalize } from '@/utils/fmt';

export interface LoginModalProps {
  onClose: () => void;
  wallet: Wallet;
}

interface FormSchema {
  password: string;
}

export function LoginModal({ wallet, onClose }: LoginModalProps) {
  const { t } = useTranslation(['common', 'walletsList']);
  const { setAuthenticatedWallet } = useAuthenticatedWallet();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      password: '',
    },
  });

  const handleSubmit = async ({ password }: FormSchema) => {
    setIsLoading(true);

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
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal
      opened
      onClose={() => onClose()}
      title={t('walletsList:walletPasswordTitle', { walletName: wallet.name })}
    >
      <LoadingOverlay visible={isLoading} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <PasswordInput
          data-autofocus
          required
          label={t('common:walletPassword')}
          placeholder={t('common:walletPassword')}
          {...form.getInputProps('password')}
        />
        <Group position="right" mt="md">
          <Button type="submit">{capitalize(t('common:submit'))}</Button>
        </Group>
      </form>
    </Modal>
  );
}
