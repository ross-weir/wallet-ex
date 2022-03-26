import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Menu, Popup, Segment } from 'semantic-ui-react';

import { useAuthenticatedWallet, useSensitiveMode } from '@/hooks';

export interface AppBarTopProps {
  attached?: boolean | 'top' | 'bottom' | undefined;
}

function AppBarTop({ attached }: AppBarTopProps) {
  const { t } = useTranslation('common');
  const { wallet, clearWallet } = useAuthenticatedWallet();
  const { sensitiveModeEnabled, setSensitiveMode } = useSensitiveMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearWallet();

    navigate('/wallets');
  };

  return (
    <>
      <Segment inverted attached={attached} style={{ marginBottom: 0 }}>
        <Menu inverted secondary>
          <Menu.Item header>{t('productName')}</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              icon={sensitiveModeEnabled ? 'eye slash' : 'eye'}
              onClick={() => setSensitiveMode(!sensitiveModeEnabled)}
            />
            <Menu.Item icon="cog" />
            {!!wallet && (
              <Popup
                trigger={<Menu.Item icon="log out" onClick={handleLogout} />}
                size="small"
                content="Logout of wallet"
              />
            )}
          </Menu.Menu>
        </Menu>
      </Segment>
    </>
  );
}

export default AppBarTop;
