import { useState } from 'react';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import { useTranslation } from 'react-i18next';
import InputField from '@kiwicom/orbit-components/lib/InputField';
import RecoveryPhraseView from '../RecoveryPhraseView';
import Box from '@kiwicom/orbit-components/lib/Box';
import Button from '@kiwicom/orbit-components/lib/Button';

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
      <Stack spacing="large">
        <Heading>Recovery Phrase</Heading>
        <RecoveryPhraseView words={input.words} onRemove={onMneomenicRemoved} />
        <InputField
          name="mneomenic"
          placeholder="Add word..."
          value={input.mneomenic}
          error={error.mneomenic}
          onChange={onInputChange}
          onKeyUp={onMneomenicKeyDown}
          onBlur={addMneomenicToWords}
        />
        <Box display="flex" justify="between">
          <Button type="secondary" onClick={() => onFormCancel()}>
            {cancelButtonText}
          </Button>
          <Button onClick={() => onFormButtonClick()}>
            {confirmButtonText}
          </Button>
        </Box>
      </Stack>
    </>
  );
}

export default WalletRecoveryPhraseForm;
