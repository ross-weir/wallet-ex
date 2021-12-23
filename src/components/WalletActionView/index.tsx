import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import { capitalize } from '../../utils/formatting';
import WalletActionForm from './WalletActionForm';

function WalletActionView() {
  const { t } = useTranslation(['common', 'walletCreateRestore']);
  const [action, setAction] = useState<'Restore' | 'Create' | ''>('');

  const totalSteps = {
    Restore: 3,
    Create: 2,
    '': 0,
  }[action];

  return (
    <>
      {action && (
        <WalletActionForm
          action={action}
          totalSteps={totalSteps}
          onCancel={() => setAction('')}
        />
      )}
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon>
                <Icon name="sync" />
                {t('walletCreateRestore:restoreWallet')}
              </Header>
              <Button primary basic onClick={() => setAction('Restore')}>
                {capitalize(t('common:restore'))}
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name="currency" />
                {t('walletCreateRestore:createWallet')}
              </Header>
              <Button primary basic>
                {capitalize(t('common:create'))}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
}

export default WalletActionView;
