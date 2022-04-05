import {
  ActionIcon,
  ActionIconProps,
  Tooltip,
  TooltipProps,
} from '@mantine/core';
import { useState } from 'react';
import { Copy } from 'tabler-icons-react';

import useStyles from './CopyIcon.styles';

interface CopyIconProps {
  copyValue?: string;
  size?: number;
  tooltipTimeoutMs?: number;
  tooltipProps?: TooltipProps;
  actionIconProps?: ActionIconProps<'button'>;
}

export function CopyIcon({
  copyValue,
  tooltipProps,
  actionIconProps,
  size = 18,
  tooltipTimeoutMs = 1250,
}: CopyIconProps) {
  const { classes } = useStyles();
  const [showTooltip, setShowTooltip] = useState(false);

  const onClick = async () => {
    if (!copyValue) {
      return;
    }

    await navigator.clipboard.writeText(copyValue);
    setShowTooltip(true);

    const handle = setTimeout(() => {
      setShowTooltip(false);
      clearInterval(handle);
    }, tooltipTimeoutMs);
  };

  return (
    <Tooltip
      {...tooltipProps}
      opened={showTooltip}
      label="Copied to clipboard"
      classNames={{
        body: classes.body,
      }}
    >
      <ActionIcon {...actionIconProps} onClick={onClick}>
        <Copy size={size} />
      </ActionIcon>
    </Tooltip>
  );
}
