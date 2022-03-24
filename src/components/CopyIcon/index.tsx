import { useState } from 'react';
import { Icon,Popup } from 'semantic-ui-react';

// Resolve conflict between web vs nodejs typings
// This makes things work in browser and jest
type TimeoutHandle = ReturnType<typeof setTimeout>;

export interface CopyIconProps {
  textToCopy: string;
  iconStyle?: React.CSSProperties;
  copyText?: string;
}

// Copy icon with a popup signalling the text was copied
function CopyIcon({
  textToCopy,
  iconStyle = {},
  copyText = 'Copied to clipboard!',
}: CopyIconProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutHandle, setTimeoutHandle] = useState<
    undefined | TimeoutHandle
  >();

  const handleOpen = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsOpen(true);

      let handle: undefined | TimeoutHandle;

      handle = setTimeout(() => {
        setIsOpen(false);
      }, 1250);

      setTimeoutHandle(handle);
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    clearTimeout(Number(timeoutHandle));
  };

  return (
    <Popup
      trigger={<Icon name="copy outline" link style={iconStyle} />}
      content={copyText}
      on="click"
      open={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      position="top left"
      style={{ opacity: 0.8 }}
      inverted
    />
  );
}

export default CopyIcon;
