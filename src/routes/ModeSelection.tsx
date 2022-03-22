import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import AppBarTop from '../components/AppBarTop';
import { getAppConfig } from '../appConfig';
import { OperatingMode } from '../types';
import { SupportedBlockchain } from '../blockchains/types';
import { ApplicationState, getAppState } from '../appState';
import { useTranslation } from 'react-i18next';

export function ModeSelection() {
  const { t } = useTranslation('modeSelection');
  const navigate = useNavigate();
  const appConfig = getAppConfig();
  const appState = getAppState();

  // on select simple mode, go to create wallet page if first use otherwise go back to previous page
  const onSimpleSelection = () => {
    // if existing wallets == 0 then navigate to create wallet
    // else navigate(-1)
  };

  const onFullNodeSelection = async () => {
    const cfgUpdate = appConfig.updatePartial({
      operatingMode: OperatingMode.FullNode,
      useLocalNode: true,
      blockchain: SupportedBlockchain.Ergo,
      network: 'testnet',
    });
    const stateUpdate = appState.update('state', ApplicationState.Initializing);

    await Promise.all([cfgUpdate, stateUpdate]);

    navigate('/initializing');
  };

  return (
    <>
      <AppBarTop />
      <Container content style={{ marginTop: 30 }}>
        <Header as="h1">
          {t('title')}
          <Header.Subheader>{t('subheader')}</Header.Subheader>
        </Header>
        <Segment padded="very">
          <div
          // style={{ cursor: 'pointer' }}
          // onClick={() => navigate(-1)}
          >
            <Header as="h2" disabled>
              <Icon name="cloud" />
              <Header.Content>
                {t('simpleMode.title')}
                <Header.Subheader>{t('simpleMode.subheader')}</Header.Subheader>
              </Header.Content>
            </Header>
          </div>
          <Divider section />
          <div style={{ cursor: 'pointer' }} onClick={onFullNodeSelection}>
            <Header as="h2">
              <Icon name="download" />
              <Header.Content>
                {t('fullNodeMode.title')}
                <Header.Subheader>
                  {t('fullNodeMode.subheader')}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        </Segment>
        <Button
          style={{ marginTop: 15 }}
          secondary
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Container>
    </>
  );
}
