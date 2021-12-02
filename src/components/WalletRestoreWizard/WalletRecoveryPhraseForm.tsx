import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RecoveryPhraseView from '../RecoveryPhraseView';
import { Grid, Header, Button, Form } from 'semantic-ui-react';

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
  confirmButtonText: string;
  cancelButtonText: string;
  onSubmit?: (values: WalletRecoveryPhraseInput) => void;
  onCancel?: (form: WalletRecoveryPhraseInput) => void;
}

function WalletRecoveryPhraseForm({
  data = initialState,
  confirmButtonText,
  cancelButtonText,
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
          <Header as="h1">Recovery Phrase</Header>
        </Grid.Column>
        <Grid.Column>
          <RecoveryPhraseView
            words={input.words}
            onRemove={onMneomenicRemoved}
          />
        </Grid.Column>
        <Grid.Column>
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
        </Grid.Column>
        <Grid.Column>
          <Grid columns={2} stackable>
            <Grid.Column>
              <Button onClick={() => onFormCancel()}>{cancelButtonText}</Button>
            </Grid.Column>
            <Grid.Column>
              {/* Add `fluid` only for mobile devices */}
              <Button
                type="submit"
                floated="right"
                primary
                onClick={() => onFormButtonClick()}
              >
                {confirmButtonText}
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default WalletRecoveryPhraseForm;
