import React, { useState } from 'react';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import { useTranslation } from 'react-i18next';
import InputField from '@kiwicom/orbit-components/lib/InputField';

interface InputState {
  password1: string;
  password2: string;
}
type ErrorState = Record<keyof InputState, string>;

const initialState: InputState = {
  password1: '',
  password2: '',
};

const initialErrors: ErrorState = {
  password1: '',
  password2: '',
};

function WalletRecoveryPassphraseForm() {
  const { t } = useTranslation('wallet');
  const [input, setInput] = useState<InputState>({ ...initialState });
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

  const validate = (): boolean => true;

  return (
    <>
      <Stack spacing="large">
        <Heading>Recovery Passphrase</Heading>
        <p>TODO paragraph explaining why its needed</p>
      </Stack>
    </>
  );
}

export default WalletRecoveryPassphraseForm;
