import { ActionIcon } from '@mantine/core';
import { X } from 'tabler-icons-react';

interface RemoveButtonProps {
  size?: number;
  onClick: () => void;
}

export function RemoveButton({ size = 10, onClick }: RemoveButtonProps) {
  return (
    <ActionIcon
      // leftSection prop of parent adds margin that can't be overriden
      sx={{ marginRight: '-5px' }}
      color="blue"
      variant="transparent"
      onClick={onClick}
    >
      <X size={size} />
    </ActionIcon>
  );
}
