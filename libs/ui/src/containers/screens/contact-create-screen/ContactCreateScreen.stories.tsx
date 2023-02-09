import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactCreateScreen } from './ContactCreateScreen';

export default {
  component: ContactCreateScreen,
} as ComponentMeta<typeof ContactCreateScreen>;

const Template: ComponentStory<typeof ContactCreateScreen> = (args) => (
  <ContactCreateScreen />
);

export const Default = Template.bind({});
Default.parameters = {
  nextRouter: {
    path: '/contact',
  },
};
