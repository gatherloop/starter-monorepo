import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Paragraph } from 'tamagui';
import { Card } from './Card';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Card height="$20" width="$15" padding="$4" {...args}>
    {args.children}
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  children: <Paragraph>Card</Paragraph>,
};
