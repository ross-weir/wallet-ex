import { ActionIcon, Popover } from '@mantine/core';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { Qrcode as QrcodeIcon } from 'tabler-icons-react';

interface QrIconProps {
  value: string;
  size?: number;
  imgSrc?: string;
}

export function QrIcon({ size = 18, value, imgSrc }: QrIconProps) {
  const [opened, setOpened] = useState(false);

  const imageSettings = imgSrc
    ? { src: imgSrc, height: 50, width: 50, excavate: true }
    : undefined;

  return (
    <Popover
      opened={opened}
      position="right"
      target={
        <ActionIcon
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
        >
          <QrcodeIcon size={size} />
        </ActionIcon>
      }
    >
      <QRCode value={value} imageSettings={imageSettings} />
    </Popover>
  );
}
