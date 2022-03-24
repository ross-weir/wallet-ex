import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { OperatingMode } from '@/types';
import { SupportedBlockchain } from '@/blockchains/types';
import { ApplicationState } from '@/storage';
import { useTranslation } from 'react-i18next';
import { useWalletEx } from '@/hooks';
import { capitalize } from '@/utils/fmt';

export function ModeSelection() {
  const { t } = useTranslation(['modeSelection']);
  const navigate = useNavigate();
  const { stateStore, configStore } = useWalletEx();

  // on select simple mode, go to create wallet page if first use otherwise go back to previous page
  const onSimpleSelection = () => {
    // if existing wallets == 0 then navigate to create wallet
    // else navigate(-1)
  };

  const onFullNodeSelection = async () => {
    const cfgUpdate = configStore.updatePartial({
      operatingMode: OperatingMode.FullNode,
      useLocalNode: true,
      blockchain: SupportedBlockchain.Ergo,
      network: 'testnet',
    });
    const stateUpdate = stateStore.update(
      'state',
      ApplicationState.Initializing,
    );

    await Promise.all([cfgUpdate, stateUpdate]);

    navigate('/initializing');
  };

  return (
    <>
      <Container content style={{ marginTop: 30 }}>
        <Header as="h1">
          {t('title')}
          <Header.Subheader>{t('modeSelection:subheader')}</Header.Subheader>
        </Header>
        <Segment padded="very">
          <div
          // style={{ cursor: 'pointer' }}
          // onClick={() => navigate(-1)}
          >
            <Header as="h2" disabled>
              <Icon name="cloud" />
              <Header.Content>
                {t('modeSelection:simpleMode.title')}
                <Header.Subheader>
                  {t('modeSelection:simpleMode.subheader')}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
          <Divider section />
          <div style={{ cursor: 'pointer' }} onClick={onFullNodeSelection}>
            <Header as="h2">
              <Icon name="download" />
              <Header.Content>
                {t('modeSelection:fullNodeMode.title')}
                <Header.Subheader>
                  {t('modeSelection:fullNodeMode.subheader')}
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
          {capitalize(t('common:back'))}
        </Button>
      </Container>
    </>
  );
}
