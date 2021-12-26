import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RecoveryPhraseView from '../RecoveryPhraseView';
import { Grid, Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useFormikContext } from 'formik';

export interface WalletRecoveryPhraseInput {
  phrase: string[];
}

export const walletRecoveryPhraseInitialState: WalletRecoveryPhraseInput = {
  phrase: [],
};

export const walletRecoveryPhraseValidationSchema = Yup.object({
  phrase: Yup.array()
    .of(Yup.string())
    // TODO: change length to 12,15,24
    .test('len', 'Phrase must be 15 words', (v) => v!.length === 2),
});

function WalletRecoveryPhraseForm() {
  const { t } = useTranslation('walletCreateRestore');
  const [mnemonic, setMnemonic] = useState('');
  const { errors, values, setFieldValue } =
    useFormikContext<WalletRecoveryPhraseInput>();

  const getT = (key: string): string => t(`phraseForm.${key}`);

  const onInputChange = (e: any) => {
    setMnemonic(e.target.value);
  };

  // TODO: only only letters to be added, no numbers or symbols
  const addMnemonicToWords = (e: any) => {
    const { value } = e.target;

    if (value) {
      setMnemonic('');
      setFieldValue('phrase', [...values.phrase, value]);
    }
  };

  const onMnemonicKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      addMnemonicToWords(e);
    }
  };

  const onMnemonicRemoved = (idx: number) => {
    setFieldValue(
      'phrase',
      values.phrase.filter((_, i) => i !== idx),
    );
  };

  return (
    <>
      <Grid columns={1}>
        <Grid.Column>
          <RecoveryPhraseView
            value={values.phrase}
            onRemove={onMnemonicRemoved}
            error={errors.phrase as string | undefined}
          />
        </Grid.Column>
        <Grid.Column>
          {/* <Dropdown> component removes items if they've been selected, couldn't figure out how to re-add
            and didn't handle big lists well out of the box
            <Search> is proving difficult to use but seems like the appropriate choice, come back to this */}
          <Form.Input
            fluid
            name="mnemonic"
            placeholder={getT('mnemonic.placeholder')}
            value={mnemonic}
            error={undefined}
            onChange={onInputChange}
            onKeyUp={onMnemonicKeyUp}
            onBlur={addMnemonicToWords}
          />
          {/* <Search
            loading={search.isLoading}
            results={search.results}
            value={input.mneomenic}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })} */}
        </Grid.Column>
      </Grid>
    </>
  );
}

export default WalletRecoveryPhraseForm;
