/**
 * Repeating selected words protects against keylogging, the user never types their full backup phrase
 */
import { Field, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'semantic-ui-react';
import { rand } from '../../utils/num';

export interface WalletRecoveryPhraseConfirmInput {
  word1: string;
  word2: string;
  word3: string;
}

export const walletRecoveryPhraseConfirmInitialState: WalletRecoveryPhraseConfirmInput =
  {
    word1: '',
    word2: '',
    word3: '',
  };

function WalletRecoveryPhraseConfirm() {
  const { t } = useTranslation(['walletCreateRestore', 'common']);
  const [isLoading, setIsLoading] = useState(true);
  // Which words to validate against in the generated mnemonic
  // For example word1: 3 means the 4th word (0 based index) in the original mnemonic should
  // be used for the word1 field in the form
  const [confirmWordIndicies, setConfirmWordIndicies] =
    useState<Record<keyof WalletRecoveryPhraseConfirmInput, number>>();
  const { errors, touched, getFieldProps, values } = useFormikContext<
    WalletRecoveryPhraseConfirmInput & { phrase: string[] }
  >();

  useEffect(() => {
    const nums = new Set();

    // Get 3 unique numbers
    while (nums.size !== 3) {
      nums.add(rand(0, values.phrase.length - 1));
    }

    const numsIter = nums.values();

    setConfirmWordIndicies(() => ({
      word1: numsIter.next().value,
      word2: numsIter.next().value,
      word3: numsIter.next().value,
    }));

    setIsLoading(false);
  }, [values.phrase.length]);

  const getT = (field: string, interpolate?: Record<string, unknown>) =>
    t(`walletCreateRestore:phraseConfirmForm:${field}`, interpolate);

  const validateWord = (index: number) => (value: string) => {
    if (value && value !== values.phrase[index]) {
      return getT('error');
    }
  };

  return (
    <>
      {isLoading ? (
        <p>loading..</p>
      ) : (
        <>
          <Field
            id="word1"
            label={getT('label', { index: confirmWordIndicies?.word1! + 1 })}
            as={Form.Input}
            error={touched.word1 && errors.word1}
            validate={validateWord(confirmWordIndicies?.word1!)}
            required
            {...getFieldProps('word1')}
          />
          <Field
            id="word2"
            label={getT('label', { index: confirmWordIndicies?.word2! + 1 })}
            as={Form.Input}
            error={touched.word2 && errors.word2}
            validate={validateWord(confirmWordIndicies?.word2!)}
            required
            {...getFieldProps('word2')}
          />
          <Field
            id="word3"
            label={getT('label', { index: confirmWordIndicies?.word3! + 1 })}
            as={Form.Input}
            error={touched.word3 && errors.word3}
            validate={validateWord(confirmWordIndicies?.word3!)}
            required
            {...getFieldProps('word3')}
          />
        </>
      )}
    </>
  );
}

export default WalletRecoveryPhraseConfirm;
