import { ActionIcon, ActionIconProps } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

export function AddAccountIcon(props: ActionIconProps<'button'>) {
  return (
    <ActionIcon variant="light" {...props}>
      <Plus size={18} />
    </ActionIcon>
  );
}
