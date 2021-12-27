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
import { hashPassword } from '../../crypto';
import { getErgo } from '../../ergo';
import { getBackendService, getInterfaceForWallet } from '../../services';
import { capitalize } from '../../utils/formatting';
import ledgerImg from '../../img/ledger.svg';
import WalletActionForm from './WalletActionForm';

function WalletActionView() {
  const { t } = useTranslation(['common', 'walletCreateRestore']);
  const [action, setAction] = useState<'Restore' | 'Create' | ''>('');
  const backend = getBackendService();
  const navigate = useNavigate();
  const ergo = getErgo();

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
    const password = await hashPassword(values.password);
    const wallet = await backend.createWallet({
      name: values.name,
      password,
      interface: 'local',
      hdStandard: 'eip3',
    });
    const seed = ergo.Mnemonic.to_seed(
      values.phrase.join(' '),
      values.mnemonicPassphrase,
    );

    // Password doesn't need to be hashed here, we use it to derive a crypt key, it's never stored
    await backend.storeSecretSeed({ password: values.password, seed, wallet });

    // Create initial account/address
    // TODO: extract out into a 'service layer'
    // TODO: kick off job to retrieve balances
    const acct = await backend.createAccount({
      name: 'Main',
      coinType: 429,
      walletId: wallet.id,
    });
    const walletInterface = getInterfaceForWallet(wallet);
    const address = await walletInterface.deriveAddress({
      seedBytes: seed,
      hdStandardArgs: { addressIdx: 0, accountIdx: 0 },
    });
    await backend.createAddress({
      deriveIdx: 0,
      accountId: acct.id,
      address,
    });

    navigate(`/wallets/${wallet.id}`, { state: { seed } });
  };

  const totalSteps = {
    Restore: 3,
    Create: 3,
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

export default WalletActionView;
