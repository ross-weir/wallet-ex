import { PasswordInput, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { capitalize } from '@/internal';
import { StackedForm } from '@/mantine/components/Form';

import {
  AddWalletAction,
  SoftwareWalletSchema,
  walletFormInitialValues,
  walletFormSchema,
} from './schema';

export interface SoftwareWalletFormProps {
  onSubmit: (
    form: UseFormReturnType<SoftwareWalletSchema>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => void;
  onCancel: () => void;
  action: AddWalletAction;
}

export function SoftwareWalletForm({
  onSubmit,
  onCancel,
  action,
}: SoftwareWalletFormProps) {
  const { t } = useTranslation(['common', 'addWallet']);
  const [loading, setLoading] = useState(false);
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

    setLoading(true);

    const mnemonic = '';
    form.setFieldValue('mnemonic', mnemonic);

    setLoading(false);
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    onSubmit(form, setLoading);
  };

  return (
    <StackedForm
      onSubmit={form.onSubmit(handleSubmit)}
      loading={loading}
      onCancel={onCancel}
    >
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
    </StackedForm>
  );
}
