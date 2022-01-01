import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Image,
} from 'semantic-ui-react';
import { capitalize } from '../../utils/formatting';
import ledgerImg from '../../img/ledger.svg';
import WalletActionForm from './WalletActionForm';
import { container } from 'tsyringe';
import { WalletService } from '../../entities';

function InitWalletView() {
  const { t } = useTranslation(['common', 'walletCreateRestore']);
  const [action, setAction] = useState<'Restore' | 'Create' | ''>('');
  const navigate = useNavigate();
  const walletService = container.resolve(WalletService);

  /**
   * Handle create/restore wallet submission. Performs the following actions:
   *
   * - Creates the wallet/stores in database
   * - Generates secret seed from mnemonic, encrypts it and stores
   *
   * @param values Example of submitted 'local' wallet:
   *  {
   *    "name": "test",
   *    "password": "testing123",
   *    "passwordConfirm": "testing123",
   *    "mnemonicPassphrase": "test",
   *    "mnemonicPassphrase2": "test", (confirmation field)
   *    "phrase": [
   *        ...
   *        "words",
   *        "here"
   *        ...
   *    ]
   *  }
   */
  const handleSubmit = async (values: Record<string, any>) => {
    const wallet = await walletService.create({
      name: values.name,
      password: values.password,
      mnemonic: values.phrase.join(' '),
      mnemonicPass: values.mnemonicPassphrase,
    });
    const seed = await wallet.unlockSeed(values.password);

    navigate(`/wallets/${wallet.id}`, { state: { seed } });
  };

  const totalSteps = {
    Restore: 3,
    Create: 4,
    '': 0,
  }[action];

  return (
    <>
      {action && (
        <WalletActionForm
          action={action}
          totalSteps={totalSteps}
          onCancel={() => setAction('')}
          onSubmit={handleSubmit}
        />
      )}
      <Segment placeholder>
        <Grid divided columns={2} stackable textAlign="center">
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon>
                <Icon name="sync" />
                {t('walletCreateRestore:restoreWallet')}
              </Header>
              <Button primary onClick={() => setAction('Restore')}>
                {capitalize(t('common:restore'))}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="currency" />
                {t('walletCreateRestore:createWallet')}
              </Header>
              <Button primary onClick={() => setAction('Create')}>
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
