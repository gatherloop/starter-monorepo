import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactFormScreen } from './ContactFormScreen';

export default {
  component: ContactFormScreen,
} as ComponentMeta<typeof ContactFormScreen>;

const Template: ComponentStory<typeof ContactFormScreen> = (args) => (
  <ContactFormScreen {...args} />
);

export const Update = Template.bind({});
Update.args = {
  variant: {
    type: 'update',
    id: 1,
  },
};
Update.parameters = {
  nextRouter: {
    path: '/',
  },
};

export const Create = Template.bind({});
Create.args = {
  variant: {
    type: 'create',
  },
};
Create.parameters = {
  nextRouter: {
    path: '/',
  },
};
