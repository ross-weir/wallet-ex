import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  tabsWrapper: {
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    borderBottomColor: `${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
    } !important`,
    paddingLeft: theme.spacing.xl * 2,

    '@media (min-width: 1380px)': {
      paddingLeft: 0,
    },
  },
  tabsList: {
    maxWidth: 1082,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
    }`,
  },
  tab: {
    fontSize: 16,
    fontWeight: 500,
    height: 46,
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
    marginBottom: -1,
    borderColor:
      theme.colorScheme === 'dark'
        ? `${theme.colors.dark[8]} !important`
        : undefined,
  },
  tabContent: {
    paddingLeft: theme.spacing.xl * 2,
    paddingRight: theme.spacing.xl * 2,
  },
  main: {
    width: '100%',
    maxWidth: 820,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));
