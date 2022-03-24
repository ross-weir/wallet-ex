import { ComponentMeta,ComponentStory } from '@storybook/react';

import AppBarTop from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'App bar top',
  component: AppBarTop,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AppBarTop>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppBarTop> = (args) => <AppBarTop />;

export const AppBarTopStory = Template.bind({});

AppBarTopStory.args = {};
