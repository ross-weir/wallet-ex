import { useAuthenticatedWallet } from '@/hooks';
import {
  useMantineColorScheme,
  ActionIcon,
  Header,
  Group,
  Title,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Sun, MoonStars, Logout } from 'tabler-icons-react';

export function AppHeader() {
  const { t } = useTranslation(['common', 'appBarTop']);
  const { wallet, clearWallet } = useAuthenticatedWallet();
  const isLoggedIn = !!wallet;
  const navigate = useNavigate();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const handleLogout = () => {
    clearWallet();

    navigate('/wallets');
  };

  return (
    <Header height={60}>
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <Title order={3}>{t('common:productName')}</Title>
        <Group>
          <ActionIcon
            variant="outline"
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
          {isLoggedIn && (
            <ActionIcon
              variant="outline"
              title={t('appBarTop:logout')}
              onClick={handleLogout}
            >
              <Logout size={18} />
            </ActionIcon>
          )}
        </Group>
      </Group>
    </Header>
  );
}
