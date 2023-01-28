import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PageHeading } from './PageHeading';

export default {
  component: PageHeading,
} as ComponentMeta<typeof PageHeading>;

const Template: ComponentStory<typeof PageHeading> = (args) => (
  <PageHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Edit Course',
};

export const HasBackIcon = Template.bind({});
HasBackIcon.args = {
  title: 'Edit Course',
  hasBackIcon: true,
};
