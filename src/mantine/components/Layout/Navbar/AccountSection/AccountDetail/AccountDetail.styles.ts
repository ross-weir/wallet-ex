import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  inner: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  },
  container: {
    ...theme.fn.focusStyles(),
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
    '&:not(:last-child)': {
      marginBottom: theme.spacing.xs,
    },
  },
  selected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));
