import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button, Divider, Header, Icon, Segment } from 'semantic-ui-react';

import { capitalize } from '@/utils/fmt';

function InitWalletView() {
  const { t } = useTranslation(['common', 'walletCreateRestore']);
  const navigate = useNavigate();

  return (
    <>
      <Segment padded="very">
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('create')}>
          <Header as="h2">
            <Icon name="currency" />
            <Header.Content>
              {t('walletCreateRestore:createWallet')}
              <Header.Subheader>
                {t('walletCreateRestore:createWalletDescription')}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <Divider section />
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('restore')}>
          <Header as="h2">
            <Icon name="sync" />
            <Header.Content>
              {t('walletCreateRestore:restoreWallet')}
              <Header.Subheader>
                {t('walletCreateRestore:restoreWalletDescription')}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
      </Segment>
      <Button
        style={{ marginTop: 15 }}
        secondary
        onClick={() => navigate('/wallets')}
      >
        {capitalize(t('common:cancel'))}
      </Button>
    </>
  );
}

export default InitWalletView;
