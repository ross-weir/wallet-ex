import { DefaultProps } from '@mantine/core';
import { PropsWithChildren } from 'react';
import useStyles from './TabContent.styles';

export function TabContent({ children }: PropsWithChildren<DefaultProps>) {
  const { classes } = useStyles();

  return <div className={classes.tabContent}>{children}</div>;
}
