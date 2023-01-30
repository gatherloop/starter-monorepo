import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactFormWidget } from './ContactFormWidget';

export default {
  component: ContactFormWidget,
} as ComponentMeta<typeof ContactFormWidget>;

const Template: ComponentStory<typeof ContactFormWidget> = (args) => (
  <ContactFormWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
};
