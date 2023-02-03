import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactFormWidget } from './ContactFormWidget';

export default {
  component: ContactFormWidget,
} as ComponentMeta<typeof ContactFormWidget>;

const Template: ComponentStory<typeof ContactFormWidget> = (args) => (
  <ContactFormWidget {...args} />
);

export const FormUpdate = Template.bind({});
FormUpdate.args = {
  variant: {
    type: 'update',
    id: 1,
  },
};

export const FormCreate = Template.bind({});
FormCreate.args = {
  variant: {
    type: 'create',
  },
};
