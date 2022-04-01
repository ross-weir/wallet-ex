import { Badge } from '@mantine/core';

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
}: MnemonicBadgeProps) {
  return (
    <Badge
      pl={0}
      radius="sm"
      leftSection={!readonly && <RemoveButton onClick={onClick} />}
    >
      {value}
    </Badge>
  );
}
