import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactUpdateScreen } from './ContactUpdateScreen';

export default {
  component: ContactUpdateScreen,
} as ComponentMeta<typeof ContactUpdateScreen>;

const Template: ComponentStory<typeof ContactUpdateScreen> = (args) => (
  <ContactUpdateScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
};
Default.parameters = {
  nextRouter: {
    path: '/contact/[id]',
  },
};
