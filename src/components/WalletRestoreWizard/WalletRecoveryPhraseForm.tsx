import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RecoveryPhraseView from '../RecoveryPhraseView';
import { Grid, Header, Button, Form } from 'semantic-ui-react';
import wordList from '../../wordLists/english.json';
import * as Yup from 'yup';
import _ from 'lodash';

export interface WalletRecoveryPhraseInput {
  words: string[];
  mneomenic: string;
}
type ErrorState = Record<keyof WalletRecoveryPhraseInput, string>;

const initialState: WalletRecoveryPhraseInput = {
  words: [],
  mneomenic: '',
};

const initialErrors: ErrorState = {
  words: '',
  mneomenic: '',
};

interface Props {
  data?: WalletRecoveryPhraseInput;
  onSubmit?: (values: WalletRecoveryPhraseInput) => void;
  onCancel?: (form: WalletRecoveryPhraseInput) => void;
}

export const walletRecoveryPhraseValidationSchema = Yup.object({
  passphrase: Yup.array()
    .of(Yup.string())
    .test('len', 'Passphrase must be 15 words', (v) => v.length === 15),
});

function WalletRecoveryPhraseForm({
  data = initialState,
  onSubmit,
  onCancel,
}: Props) {
  const { t } = useTranslation('wallet');
  const [input, setInput] = useState<WalletRecoveryPhraseInput>({
    ...data,
  });
  const [error, setError] = useState<ErrorState>({ ...initialErrors });

  const clearErrors = () => setError(() => ({ ...initialErrors }));

  const onInputChange = (e: any) => {
    const { name, value } = e.target;

    clearErrors();

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TODO: only only letters to be added, no numbers or symbols
  const addMneomenicToWords = (e: any) => {
    const { value } = e.target;

    if (value) {
      setInput((prev) => ({
        ...prev,
        words: [...prev.words, value],
        mneomenic: '',
      }));
    }
  };

  const onMneomenicKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      addMneomenicToWords(e);
    }
  };

  const onMneomenicRemoved = (idx: number) => {
    setInput((prev) => {
      prev.words.splice(idx, 1);
      return {
        ...prev,
        words: [...prev.words],
      };
    });
  };

  // TODO: Check words length, what other things?
  const validate = (): boolean => true;

  const onFormButtonClick = () => {
    if (validate() && onSubmit) {
      onSubmit({ ...input });
    }
  };

  const onFormCancel = () => {
    if (onCancel) {
      onCancel({ ...input });
    }
  };

  // TODO: section for validation errors
  return (
    <>
      <Grid columns={1}>
        <Grid.Column>
          <RecoveryPhraseView
            value={input.words}
            onRemove={onMneomenicRemoved}
            error={''}
          />
        </Grid.Column>
        <Grid.Column>
          {/* <Dropdown> component removes items if they've been selected, couldn't figure out how to re-add
            and didn't handle big lists well out of the box
            <Search> is proving difficult to use but seems like the appropriate choice, come back to this */}
          <Form.Input
            fluid
            name="mneomenic"
            placeholder="Add word..."
            value={input.mneomenic}
            error={error.mneomenic || undefined}
            onChange={onInputChange}
            onKeyUp={onMneomenicKeyDown}
            onBlur={addMneomenicToWords}
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
