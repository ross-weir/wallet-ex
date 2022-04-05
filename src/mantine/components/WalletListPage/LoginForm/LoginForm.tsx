import { PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { capitalize } from '@/internal';

import { StackedForm } from '../../Form';

interface LoginSchema {
  password: string;
}

interface LoginFormProps {
  onSubmit: (
    form: UseFormReturnType<LoginSchema>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => void;
  onCancel: () => void;
}

export function LoginForm({ onSubmit, onCancel }: LoginFormProps) {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginSchema>({
    initialValues: {
      password: '',
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    onSubmit(form, setLoading);
  };

  return (
    <StackedForm
      onSubmit={form.onSubmit(handleSubmit)}
      onCancel={onCancel}
      loading={loading}
    >
      <PasswordInput
        data-autofocus
        required
        label={capitalize(t('password'))}
        placeholder={capitalize(t('password'))}
        {...form.getInputProps('password')}
      />
    </StackedForm>
  );
}
