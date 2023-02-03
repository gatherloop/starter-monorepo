import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactListScreen } from './ContactListScreen';

export default {
  component: ContactListScreen,
} as ComponentMeta<typeof ContactListScreen>;

const Template: ComponentStory<typeof ContactListScreen> = (args) => (
  <ContactListScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {};
