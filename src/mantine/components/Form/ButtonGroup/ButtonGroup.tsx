import { Button, Group, GroupProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { capitalize } from '@/internal';

interface FormButtonGroupProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  groupProps?: GroupProps;
}

export function FormButtonGroup({
  onSubmit,
  onCancel,
  groupProps,
}: FormButtonGroupProps) {
  const { t } = useTranslation('common');

  return (
    <Group position="right" {...groupProps}>
      <Button variant="subtle" onClick={onCancel}>
        {capitalize(t('cancel'))}
      </Button>
      <Button type="submit" onClick={onSubmit}>
        {capitalize(t('submit'))}
      </Button>
    </Group>
  );
}
