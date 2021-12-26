// Generate a new recovery phrase for the user to write down

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Message } from 'semantic-ui-react';
import { capitalize } from '../../utils/formatting';
import RecoveryPhraseView from '../RecoveryPhraseView';

// TODO: toggle visibility of phrase
function WalletRecoveryPhraseRecord() {
  const { t } = useTranslation(['common', 'walletCreateRestore']);
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(true);

  // Generate mnemonic
  useEffect(() => {
    setIsLoading(false);
  }, []);

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
      <RecoveryPhraseView
        value={['test', 'hide', 'word', 'word1']}
        hide={isHidden}
      />
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
