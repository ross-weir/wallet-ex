import React, { useState } from 'react';
import Button from '@kiwicom/orbit-components/lib/Button';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import InputField from '@kiwicom/orbit-components/lib/InputField';

interface WalletDetailsFormProps {
  buttonText: string;
  onSubmit?: (form: { name: string; password: string }) => void;
}

type FieldName = 'name' | 'password1' | 'password2';
type InputState = Record<FieldName, string>;
type ErrorState = Record<FieldName, string>;

const initialState = {
  name: '',
  password1: '',
  password2: '',
};

function WalletDetailsForm({ onSubmit, buttonText }: WalletDetailsFormProps) {
  const [input, setInput] = useState<InputState>({ ...initialState });
  const [error, setError] = useState<ErrorState>({ ...initialState });

  const clearErrors = () => setError(() => ({ ...initialState }));

  const onInputChange = (e) => {
    const { name, value } = e.target;

    clearErrors();

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const { name, password1, password2 } = input;

    if (!name) {
      setError((prev) => ({
        ...prev,
        name: 'Must set a wallet name',
      }));

      return false;
    }

    if (!password1 && !password2) {
      setError((prev) => ({
        ...prev,
        password1: 'Must set a password',
      }));
    }

    if (password1 !== password2) {
      setError((prev) => ({
        ...prev,
        password1: "Passwords don't match",
      }));

      return false;
    }

    return true;
  };

  const onFormButtonClick = () => {
    if (validate() && onSubmit) {
      onSubmit({ name: input.name, password: input.password1 });
    }
  };

  return (
    <>
      <Stack spacing="large">
        <Heading>Wallet details</Heading>
        <InputField
          name="name"
          label="Wallet name"
          placeholder="My cool wallet"
          value={input.name}
          error={error.name}
          onChange={onInputChange}
          required
        />
        <InputField
          name="password1"
          label="Wallet password"
          placeholder="Password"
          type="password"
          value={input.password1}
          error={error.password1}
          onChange={onInputChange}
          required
        />
        <InputField
          name="password2"
          label="Confirm wallet password"
          placeholder="Confirm password"
          type="password"
          value={input.password2}
          error={error.password2}
          onChange={onInputChange}
          required
        />
        <Stack direction="row">
          <Button type="secondary">Cancel</Button>
          {/* No idea how to make this button move all the way to the right */}
          <Button onClick={() => onFormButtonClick()}>{buttonText}</Button>
        </Stack>
      </Stack>
    </>
  );
}

export type { WalletDetailsFormProps };
export default WalletDetailsForm;
