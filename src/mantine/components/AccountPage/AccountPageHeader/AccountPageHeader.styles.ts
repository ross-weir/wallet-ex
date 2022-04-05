import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    zIndex: 4,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    paddingLeft: theme.spacing.xl * 2,
    paddingRight: theme.spacing.xl * 2,
  },
  header: {
    paddingTop: 50,
    maxWidth: 1082,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: theme.spacing.xl * 1.5,
  },
  title: {
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  description: {
    maxWidth: 450,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    marginBottom: theme.spacing.xl,
  },
}));
