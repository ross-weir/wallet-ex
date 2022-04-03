import { Tab, Tabs } from '@mantine/core';
import { ArrowDown, ArrowUp } from 'tabler-icons-react';

import useStyles from './AccountPageTabs.styles';
import { ReceiveTab } from './ReceiveTab/ReceiveTab';
import { TabContent } from './TabContent/TabContent';

export function AccountPageTabs() {
  const { classes } = useStyles();

  // get tabs based on blockchain: (staking vs tokens vs etc)
  // selected tab == 't' query param
  return (
    <Tabs
      variant="outline"
      classNames={{
        tabsList: classes.tabsList,
        tabsListWrapper: classes.tabsWrapper,
      }}
    >
      <Tab icon={<ArrowUp />} label="Send" className={classes.tab}>
        <TabContent>Send</TabContent>
      </Tab>
      <Tab icon={<ArrowDown />} label="Recv" className={classes.tab}>
        <TabContent>
          <ReceiveTab />
        </TabContent>
      </Tab>
    </Tabs>
  );
}
