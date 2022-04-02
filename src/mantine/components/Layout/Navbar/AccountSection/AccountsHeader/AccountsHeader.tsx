import { ActionIconProps, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { AddAccountIcon } from './AddAccountIcon/AddAccountIcon';

export interface AccountsHeaderProps {
  iconProps?: ActionIconProps<'button'>;
}

export function AccountsHeader({ iconProps }: AccountsHeaderProps) {
  const { t } = useTranslation(['accountSection']);

  return (
    <Group position="apart">
      <Text weight={500} size="lg">
        {t('myAccounts')}
      </Text>
      <AddAccountIcon {...iconProps} />
    </Group>
  );
}
