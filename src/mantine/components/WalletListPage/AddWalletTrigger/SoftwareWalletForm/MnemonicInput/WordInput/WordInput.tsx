import { Input, InputProps } from '@mantine/core';
import { ChangeEvent, ClipboardEvent,KeyboardEvent, useState } from 'react';

interface WordInputProps {
  onValue: (value: string) => void;
}

export function WordInput({
  onValue,
  ...rest
}: WordInputProps & InputProps<'input'>) {
  const [input, setInput] = useState('');

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    let { value } = evt.target;

    setInput(value);

    if (!value.endsWith(' ')) {
      return;
    }

    value = value.trim();

    if (!value) {
      return;
    }

    setInput('');
    onValue(value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onValue(input);
      setInput('');
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput('');
    onValue(e.clipboardData.getData('Text').trim());
  };

  return (
    <Input
      value={input}
      onChange={handleInput}
      onKeyUp={handleKeyUp}
      onPaste={handlePaste}
      {...rest}
    />
  );
}
