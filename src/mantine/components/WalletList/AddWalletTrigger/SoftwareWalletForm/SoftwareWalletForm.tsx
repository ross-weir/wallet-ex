import { capitalize } from '@/internal';
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Stack,
  LoadingOverlay,
} from '@mantine/core';
import { yupResolver, useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AddWalletAction,
  walletFormInitialValues,
  WalletFormSchema,
  walletFormSchema,
} from './schema';

export interface SoftwareWalletFormProps {
  onSubmit: (form: WalletFormSchema) => void;
  action: AddWalletAction;
}

export function SoftwareWalletForm({
  onSubmit,
  action,
}: SoftwareWalletFormProps) {
  const { t } = useTranslation(['common', 'addWallet']);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: walletFormInitialValues,
    schema: yupResolver(walletFormSchema),
  });

  useEffect(() => {
    // if restoring user will input the mnemonic
    // if creating we generate for them and set the field value
    if (action === 'restore') {
      return;
    }

    setIsLoading(true);

    const mnemonic = '';
    form.setFieldValue('mnemonic', mnemonic);

    setIsLoading(false);
  }, []);

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <LoadingOverlay visible={isLoading} />
      <Stack>
        <TextInput
          data-autofocus
          required
          label={capitalize(t('common:name'))}
          placeholder={capitalize(t('common:name'))}
          {...form.getInputProps('name')}
        />
        <PasswordInput
          required
          label={capitalize(t('common:password'))}
          placeholder={capitalize(t('common:password'))}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          required
          label={t('common:passwordConfirm')}
          placeholder={t('common:passwordConfirm')}
          {...form.getInputProps('passwordConfirm')}
        />
        {/* mnemonc field, populates mnemonics field */}
        <PasswordInput
          label={t('addWallet:mnemonicPass')}
          placeholder={t('addWallet:mnemonicPass')}
          {...form.getInputProps('mnemonicPass')}
        />
        <PasswordInput
          label={t('addWallet:mnemonicPassConfirm')}
          placeholder={t('addWallet:mnemonicPassConfirm')}
          {...form.getInputProps('mnemonicPassConfirm')}
        />
        <Group position="right">
          <Button type="submit">{capitalize(t('common:submit'))}</Button>
        </Group>
      </Stack>
    </form>
  );
}
