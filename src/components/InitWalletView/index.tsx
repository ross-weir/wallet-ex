import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';

import ledgerImg from '../../img/ledger.svg';
import { capitalize } from '../../utils/fmt';

function InitWalletView() {
  const { t } = useTranslation(['common', 'walletCreateRestore']);
  const navigate = useNavigate();

  return (
    <>
      <Segment placeholder>
        <Grid divided columns={2} stackable textAlign="center">
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon>
                <Icon name="sync" />
                {t('walletCreateRestore:restoreWallet')}
              </Header>
              <Button primary onClick={() => navigate('restore')}>
                {capitalize(t('common:restore'))}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="currency" />
                {t('walletCreateRestore:createWallet')}
              </Header>
              <Button primary onClick={() => navigate('create')}>
                {capitalize(t('common:create'))}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Divider horizontal content={t('common:or').toUpperCase()} />
      <Segment
        // TODO: Only apply style above certain media size
        style={{ marginLeft: 130, marginRight: 130 }}
        placeholder
        textAlign="center"
        vertical
      >
        <Image
          style={{ marginBottom: 10 }}
          centered
          src={ledgerImg}
          size="small"
        />
        <span style={{ marginBottom: 10 }} role="img">
          Soon {String.fromCodePoint(0x1f92d)}
        </span>
        <Button primary disabled>
          {capitalize(t('common:connect'))}
        </Button>
      </Segment>
    </>
  );
}

export default InitWalletView;
