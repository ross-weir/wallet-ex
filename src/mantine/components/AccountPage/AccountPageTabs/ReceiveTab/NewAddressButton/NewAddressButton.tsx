import { Button, ButtonProps } from '@mantine/core';
import { PropsWithChildren } from 'react';

import useStyles from './NewAddressButton.styles';

export function NewAddressButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps<'button'>>) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Button {...props} variant="light">
        {children}
      </Button>
    </div>
  );
}
