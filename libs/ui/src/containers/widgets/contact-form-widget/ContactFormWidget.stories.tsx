import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactFormWidget } from './ContactFormWidget';

export default {
  component: ContactFormWidget,
} as ComponentMeta<typeof ContactFormWidget>;

const Template: ComponentStory<typeof ContactFormWidget> = (args) => (
  <ContactFormWidget {...args} />
);

export const FormEdit = Template.bind({});
FormEdit.args = {
  id: 1,
  variant: 'update',
};

export const FormCreate = Template.bind({});
FormCreate.args = {
  variant: 'create',
};
