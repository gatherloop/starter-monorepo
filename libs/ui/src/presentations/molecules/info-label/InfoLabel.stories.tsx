import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InfoLabel } from './InfoLabel';

export default {
  component: InfoLabel,
} as ComponentMeta<typeof InfoLabel>;

const Template: ComponentStory<typeof InfoLabel> = (args) => (
  <InfoLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Name',
  value: 'M. Nindra Zaka',
};
