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

export function ModeSelection() {
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
          Mode Selection
          <Header.Subheader>
            Select the operating mode for Wallet Ex, this can be changed at any
            time on the settings page.
          </Header.Subheader>
        </Header>
        <Segment padded="very">
          <div
          // style={{ cursor: 'pointer' }}
          // onClick={() => navigate(-1)}
          >
            <Header as="h2" disabled>
              <Icon name="cloud" />
              <Header.Content>
                Simple Mode
                <Header.Subheader>
                  Easy sending, receiving and viewing of wallets. Uses a remote
                  node or service and does not download the blockchain to your
                  computer. Recommended if you're new to cryptocurrency.
                </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
          <Divider section />
          <div style={{ cursor: 'pointer' }} onClick={onFullNodeSelection}>
            <Header as="h2">
              <Icon name="download" />
              <Header.Content>
                Full Node Mode
                <Header.Subheader>
                  Runs a full node to aid with decentralization and security.
                  Downloads the entire blockchain to your computer.
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
