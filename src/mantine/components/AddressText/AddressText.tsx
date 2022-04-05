import { DefaultProps, Group, Text } from '@mantine/core';

import { CopyIcon } from '../CopyIcon';
import { QrIcon } from '../QrIcon';
import useStyles from './AddressText.styles';

interface AddressTextProps {
  value: string;
  showCopyIcon?: boolean;
  showQrIcon?: boolean;
}

export function AddressText({
  value,
  showCopyIcon = true,
  showQrIcon = true,
  ...rest
}: AddressTextProps & DefaultProps) {
  const { classes } = useStyles();

  return (
    <Group>
      <Text className={classes.text} {...rest}>
        {value}
      </Text>
      <Group spacing={0}>
        {showCopyIcon && <CopyIcon copyValue={value} />}
        {showQrIcon && <QrIcon value={value} />}
      </Group>
    </Group>
  );
}
