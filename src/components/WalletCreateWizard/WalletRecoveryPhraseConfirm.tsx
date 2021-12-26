import { useFormikContext } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from 'semantic-ui-react';

export interface WalletRecoveryPhraseConfirmInput {
  phrase: string[];
}

export const walletRecoveryPhraseConfirmInitialState: WalletRecoveryPhraseConfirmInput =
  {
    phrase: [],
  };

function WalletRecoveryPhraseConfirm() {
  const { t } = useTranslation('walletCreateRestore');
  const [mnemonic, setMnemonic] = useState('');
  const { errors, values, setFieldValue, setFieldError } =
    useFormikContext<WalletRecoveryPhraseConfirmInput>();

  return (
    <>
      <Grid columns={1}>
        <Grid.Column></Grid.Column>
      </Grid>
    </>
  );
}

export default WalletRecoveryPhraseConfirm;
