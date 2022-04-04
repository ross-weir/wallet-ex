import { Badge, MantineStyleSystemProps } from '@mantine/core';

import { RemoveButton } from '../RemoveButton/RemoveButton';

interface MnemonicBadgeProps {
  readonly: boolean;
  value: string;
  onClick: () => void;
}

export function MnemonicBadge({
  readonly,
  value,
  onClick,
  ...rest
}: MnemonicBadgeProps & MantineStyleSystemProps) {
  return (
    <Badge
      radius="sm"
      leftSection={!readonly && <RemoveButton onClick={onClick} />}
      {...rest}
    >
      {value}
    </Badge>
  );
}
