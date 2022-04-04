import { Button } from '@mantine/core';
import {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from 'react';

import useStyles from './NewAddressButton.styles';

interface NewAddressButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function NewAddressButton({
  onClick,
  children,
}: PropsWithChildren<NewAddressButton>) {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!onClick) {
      return;
    }

    setLoading(true);
    try {
      onClick(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Button variant="light" loading={loading} onClick={handleClick}>
        {children}
      </Button>
    </div>
  );
}
