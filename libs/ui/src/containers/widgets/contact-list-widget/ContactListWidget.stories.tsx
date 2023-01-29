import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactListWidget } from './ContactListWidget';

export default {
  component: ContactListWidget,
} as ComponentMeta<typeof ContactListWidget>;

const Template: ComponentStory<typeof ContactListWidget> = (args) => (
  <ContactListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {};
