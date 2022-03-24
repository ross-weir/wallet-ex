// Generate a new recovery phrase for the user to write down
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Message } from 'semantic-ui-react';
import { capitalize } from '../../utils/fmt';
import RecoveryPhraseView from '../RecoveryPhraseView';
import { generateMnemonic } from 'bip39';
import { useFormikContext } from 'formik';

// 15 words
// TODO: make this configurable
const MNEMONIC_ENTROPHY = 160;

export interface WalletRecoveryPhraseRecordInput {
  phrase: string[];
}

export const walletRecoveryPhraseRecordInitialState: WalletRecoveryPhraseRecordInput =
  {
    phrase: [],
  };

function WalletRecoveryPhraseRecord() {
  const { t } = useTranslation(['common', 'walletCreateRestore']);
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const { values, setFieldValue } =
    useFormikContext<WalletRecoveryPhraseRecordInput>();

  useEffect(() => {
    // TODO: support different languages
    // If the user navigates backwards don't regenerate the mnemonic
    if (!values.phrase.length) {
      setFieldValue('phrase', generateMnemonic(MNEMONIC_ENTROPHY).split(' '));
    }
    setIsLoading(false);
  }, [setFieldValue, values.phrase.length]);

  const getT = (key: string): string =>
    t(`walletCreateRestore:phraseRecordForm.${key}`);

  const hideButtonText = () =>
    capitalize(t(isHidden ? 'common:reveal' : 'common:hide'));

  return (
    <>
      <Message
        info
        icon="info circle"
        header={getT('infoHeader')}
        content={
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: getT('info'),
              }}
            />
          </>
        }
      />
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <RecoveryPhraseView value={values.phrase} hidden={isHidden} />
      )}
      <Button
        type="button"
        disabled={isLoading}
        onClick={() => setIsHidden(!isHidden)}
      >
        {hideButtonText()}
      </Button>
    </>
  );
}

export default WalletRecoveryPhraseRecord;
