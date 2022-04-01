import { Input, InputProps } from '@mantine/core';
import { ChangeEvent, KeyboardEvent,useState } from 'react';

interface WordInputProps {
  onWord: (word: string) => void;
}

export function WordInput({
  onWord,
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
    onWord(value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onWord(input);
      setInput('');
    }
  };

  return (
    <Input
      value={input}
      onChange={handleInput}
      onKeyUp={handleKeyUp}
      {...rest}
    />
  );
}
