import { Group, Header as MantineHeader, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';
import useStyles from './Header.styles';
import { Logout } from './Logout/Logout';

interface HeaderProps {
  onLogout: () => void;
  loggedIn: boolean;
}

export function Header({ onLogout, loggedIn }: HeaderProps) {
  const { classes } = useStyles();
  const { t } = useTranslation('common');

  return (
    <MantineHeader height={60}>
      <Group className={classes.inner} px={20} position="apart">
        <Title order={3}>{t('productName')}</Title>
        <Group>
          <ColorSchemeToggle />
          {loggedIn && <Logout onLogout={onLogout} />}
        </Group>
      </Group>
    </MantineHeader>
  );
}
