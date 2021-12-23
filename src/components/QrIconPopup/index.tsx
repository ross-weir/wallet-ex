import { Icon, Popup } from 'semantic-ui-react';
import QRCode from 'qrcode.react';

export interface QrIconPopupProps {
  value: string;
  iconStyle?: React.CSSProperties;
  // controls the QR image settings
  coinType?: number;
}

interface QrImgSettings {
  src: string;
  excavate?: boolean;
  height?: number;
  width?: number;
}

// coinType -> image settings
const qrImageMap: Record<number, QrImgSettings> = {
  429: {
    excavate: true,
    height: 50,
    width: 50,
    src: 'https://raw.githubusercontent.com/ergoplatform/awesome-ergo/master/graphics/Logo/symbol_bold__1080px__orange.svg',
  },
};

function QrIconPopup({ value, iconStyle = {}, coinType }: QrIconPopupProps) {
  return (
    <Popup
      trigger={<Icon name="qrcode" link style={iconStyle} />}
      content={
        <QRCode
          value={value}
          imageSettings={coinType ? qrImageMap[coinType] : undefined}
        />
      }
      on="hover"
      position="top left"
    />
  );
}

export default QrIconPopup;
