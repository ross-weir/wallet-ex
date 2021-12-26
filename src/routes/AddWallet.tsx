import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  Button,
  Container,
  Header,
  Icon,
  Grid,
  Divider,
} from 'semantic-ui-react';
import AppBarTop from '../components/AppBarTop';
import WalletActionView from '../components/WalletActionView';
import { capitalize } from '../utils/formatting';

function AddWallet() {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();

  return (
    <>
      <AppBarTop />
      <Container text style={{ marginTop: 30 }}>
        <Grid columns={2}>
          <Grid.Column verticalAlign="middle">
            <Header as="h2" content="Add Wallet" />
          </Grid.Column>
          <Grid.Column>
            <Button
              floated="right"
              icon
              size="tiny"
              labelPosition="left"
              onClick={() => navigate(-1)}
            >
              <Icon name="arrow left" />
              {capitalize(t('common:back'))}
            </Button>
          </Grid.Column>
        </Grid>
        <Divider />
        <WalletActionView />
      </Container>
    </>
  );
}

export default AddWallet;
