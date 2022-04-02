import { Avatar, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface SelectItemImageProps
  extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description?: string;
}

export const SelectItemImage = forwardRef<HTMLDivElement, SelectItemImageProps>(
  ({ image, label, description, ...others }: SelectItemImageProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar size="xs" src={image} />

        <div>
          <Text size="sm">{label}</Text>
          {description && (
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          )}
        </div>
      </Group>
    </div>
  ),
);
