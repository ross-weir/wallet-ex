import QRCode from 'qrcode.react';
import { Icon, Popup } from 'semantic-ui-react';

import { SupportedBlockchain } from '@/internal';

export interface QrIconPopupProps {
  value: string;
  iconStyle?: React.CSSProperties;
  // controls the QR image settings
  blockchain?: SupportedBlockchain;
}

interface QrImgSettings {
  src: string;
  excavate?: boolean;
  height?: number;
  width?: number;
}

const qrImageMap: Record<SupportedBlockchain, QrImgSettings> = {
  [SupportedBlockchain.Ergo]: {
    excavate: true,
    height: 50,
    width: 50,
    src: '/icons/blockchains/ergo/ergo_black.svg',
  },
};

function QrIconPopup({ value, iconStyle = {}, blockchain }: QrIconPopupProps) {
  return (
    <Popup
      trigger={<Icon name="qrcode" link style={iconStyle} />}
      content={
        <QRCode
          value={value}
          imageSettings={blockchain ? qrImageMap[blockchain] : undefined}
        />
      }
      on="hover"
      position="top left"
    />
  );
}

export default QrIconPopup;
