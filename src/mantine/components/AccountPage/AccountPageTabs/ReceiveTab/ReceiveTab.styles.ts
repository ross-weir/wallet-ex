import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  currentAddressContainer: {
    marginTop: theme.spacing.lg,
    display: 'inline-flex',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
  },
  addressBtnContainer: {
    marginTop: theme.spacing.lg,
  },
}));
