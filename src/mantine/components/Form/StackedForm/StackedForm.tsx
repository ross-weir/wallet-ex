import { LoadingOverlay, Stack, StackProps } from '@mantine/core';
import { FormEvent, PropsWithChildren } from 'react';

import { FormButtonGroup } from '../ButtonGroup/ButtonGroup';

interface StackedFormProps {
  onSubmit: (form: FormEvent<HTMLElement>) => void;
  onCancel: () => void;
  loading?: boolean;
  stackProps?: StackProps;
}

export function StackedForm({
  loading = false,
  onSubmit,
  onCancel,
  children,
  stackProps,
}: PropsWithChildren<StackedFormProps>) {
  return (
    <form onSubmit={onSubmit} autoComplete="off" autoSave="off">
      <Stack {...stackProps}>
        <LoadingOverlay visible={loading} />
        {children}
        <FormButtonGroup onCancel={onCancel} />
      </Stack>
    </form>
  );
}