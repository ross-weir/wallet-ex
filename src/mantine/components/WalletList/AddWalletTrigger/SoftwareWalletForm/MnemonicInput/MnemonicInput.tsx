import { Group, InputWrapper, Paper } from '@mantine/core';
import { ReactNode } from 'react';

import { MnemonicBadge } from './MnemonicBadge/MnemonicBadge';
import useStyles from './MnemonicInput.styles';
import { WordInput } from './WordInput/WordInput';

interface MnemonicInputProps {
  readonly: boolean;
  value: string[];
  error?: ReactNode;
  onMnemonicClick: (idx: number) => void;
  onMnemonicAdded?: (mnemonic: string) => void;
}

export function MnemonicInput({
  readonly,
  value,
  error,
  onMnemonicClick,
  onMnemonicAdded,
}: MnemonicInputProps) {
  const { classes, cx } = useStyles();

  return (
    <>
      <InputWrapper
        id="mnemonic"
        required
        label="Recovery phrase"
        description="This is your wallet recovery phrase"
        error={error}
      >
        <Paper
          className={cx(classes.container, { [classes.error]: !!error })}
          shadow="sm"
          p="md"
          withBorder
        >
          <Group>
            {value.map((mnemonic, i) => (
              <MnemonicBadge
                pl={!readonly ? 0 : undefined}
                key={`${mnemonic}-${i}`}
                value={`${i + 1}. ${mnemonic}`}
                readonly={readonly}
                onClick={() => onMnemonicClick(i)}
              />
            ))}
          </Group>
        </Paper>
        {!readonly && onMnemonicAdded && (
          <WordInput
            invalid={!!error}
            pt="md"
            onWord={(word) => onMnemonicAdded(word)}
          />
        )}
      </InputWrapper>
    </>
  );
}
