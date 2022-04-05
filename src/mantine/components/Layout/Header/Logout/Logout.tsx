import { ActionIcon } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Logout as LogoutIcon } from 'tabler-icons-react';

interface LogoutProps {
  onLogout: () => void;
}

export function Logout({ onLogout }: LogoutProps) {
  const { t } = useTranslation('appBarTop');

  return (
    <ActionIcon variant="outline" title={t('logout')} onClick={onLogout}>
      <LogoutIcon size={18} />
    </ActionIcon>
  );
}
